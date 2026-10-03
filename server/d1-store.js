import CORE from './core.js';
import { randomUUID, createHash } from 'node:crypto';

const tables = Object.keys(CORE.TABLES);
const digest = value => createHash('sha256').update(value).digest('hex');

// CORE keeps its synchronous validation API. Read a consistent snapshot once,
// then commit only changed records in one atomic D1 batch.
export async function loadStore(db, token = '') {
  const queries = [
    db.prepare('SELECT version FROM app_revision WHERE id = 1'),
    ...tables.map(t => db.prepare(`SELECT * FROM "${t}"`)),
    db.prepare('SELECT key, value FROM settings'),
    db.prepare('SELECT * FROM sessions WHERE token_hash = ? AND expires_at > ?').bind(digest(token), Date.now())
  ];
  const results = await db.batch(queries);
  const revision = results[0].results[0].version;
  const data = Object.fromEntries(tables.map((t, i) => [t, results[i + 1].results]));
  let settings = Object.fromEntries(results[tables.length + 1].results.map(r => [r.key, r.value]));
  const session = results[tables.length + 2].results[0];
  const changes = new Map();
  const replacements = new Set();
  const sessionOps = [];
  let settingsChanged = false;
  const remember = (t, id, row) => {
    if (!changes.has(t)) changes.set(t, new Map());
    changes.get(t).set(id, row);
  };
  return {
    all(t) { return data[t].map(r => ({ ...r })); },
    insert(t, rows) { for (const row of rows) { data[t].push({ ...row }); remember(t, row.id, row); } },
    update(t, row) {
      const index = data[t].findIndex(r => r.id === row.id);
      if (index < 0) throw new Error('ไม่พบข้อมูล');
      data[t][index] = { ...row }; remember(t, row.id, row);
    },
    remove(t, ids) { data[t] = data[t].filter(r => !ids.includes(r.id)); ids.forEach(id => remember(t, id, null)); },
    replaceAll(t, rows) {
      data[t] = rows.map(r => ({ ...r })); replacements.add(t);
      changes.set(t, new Map(rows.map(r => [r.id, r])));
    },
    getSettingsRaw() { return { ...settings }; },
    setSettingsRaw(value) { settings = { ...value }; settingsChanged = true; },
    sessionGet(value) { return value && session ? session.user_id : null; },
    sessionPut(value, uid) { sessionOps.push({ hash: digest(value), uid, expires: Date.now() + 21600000 }); },
    sessionDel(value) { sessionOps.push({ hash: digest(value), remove: true }); },
    async commit() {
      if (!changes.size && !settingsChanged && !sessionOps.length) return true;
      const nonce = randomUUID();
      const guard = 'EXISTS (SELECT 1 FROM app_revision WHERE id=1 AND nonce=?)';
      const statements = [db.prepare('UPDATE app_revision SET version=version+1, nonce=? WHERE id=1 AND version=?').bind(nonce, revision)];
      for (const [t, records] of changes) {
        if (replacements.has(t)) statements.push(db.prepare(`DELETE FROM "${t}" WHERE ${guard}`).bind(nonce));
        const cols = CORE.TABLES[t].cols;
        for (const [id, row] of records) {
          if (!row) {
            statements.push(db.prepare(`DELETE FROM "${t}" WHERE id=? AND ${guard}`).bind(id, nonce));
            continue;
          }
          const values = cols.map(c => typeof row[c] === 'boolean' ? Number(row[c]) : row[c] ?? '');
          statements.push(db.prepare(`INSERT INTO "${t}" (${cols.map(c => `"${c}"`).join(',')}) SELECT ${cols.map(() => '?').join(',')} WHERE ${guard} ON CONFLICT(id) DO UPDATE SET ${cols.filter(c => c !== 'id').map(c => `"${c}"=excluded."${c}"`).join(',')}`).bind(...values, nonce));
        }
      }
      if (settingsChanged) {
        statements.push(db.prepare(`DELETE FROM settings WHERE ${guard}`).bind(nonce));
        for (const [key, value] of Object.entries(settings)) statements.push(db.prepare(`INSERT INTO settings(key,value) SELECT ?,? WHERE ${guard}`).bind(key, String(value), nonce));
      }
      for (const op of sessionOps) {
        statements.push(op.remove
          ? db.prepare(`DELETE FROM sessions WHERE token_hash=? AND ${guard}`).bind(op.hash, nonce)
          : db.prepare(`INSERT INTO sessions(token_hash,user_id,expires_at) SELECT ?,?,? WHERE ${guard}`).bind(op.hash, op.uid, op.expires, nonce));
      }
      statements.push(db.prepare(`DELETE FROM sessions WHERE expires_at < ? AND ${guard}`).bind(Date.now(), nonce));
      const committed = await db.batch(statements);
      return committed[0].meta.changes === 1;
    }
  };
}
