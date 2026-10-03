import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';
import { loadStore } from '../server/d1-store.js';
import CORE from '../server/core.js';

let mf, db, cookie;
async function rpc(action, payload = {}, session = cookie) {
  const request = new Request('http://localhost/api/rpc', { method:'POST', headers: { 'Content-Type':'application/json', ...(session ? { Cookie:session } : {}) }, body:JSON.stringify({ action, payload }) });
  const response = await mf.dispatchFetch(request.url, { method: request.method, headers: request.headers, body: await request.text() });
  return { status: response.status, headers: response.headers, ...await response.json() };
}
before(async () => {
  const bundle = fs.readdirSync('.wrangler/test-worker').find(name => name.endsWith('.js'));
  mf = new Miniflare(convertV4MiniflareOptions({ modules: true, scriptPath: '.wrangler/test-worker/' + bundle, compatibilityDate:'2026-10-03', compatibilityFlags:['nodejs_compat'], bindings: { SETUP_TOKEN:'test-setup-token' }, d1Databases: ['DB'] }));
  db = await mf.getD1Database('DB');
  const sql = fs.readFileSync('migrations/0001_initial.sql', 'utf8').replace(/^--.*$/gm, '');
  await db.batch(sql.split(';').map(s => s.trim()).filter(Boolean).map(s => db.prepare(s)));
});
after(async () => { await mf?.dispose(); });

test('setup, auth, CRUD, permissions, import, backup/restore and atomic conflicts', async () => {
  assert.equal((await rpc('bootstrap', {}, '')).code, 'AUTH');
  assert.equal((await rpc('publicInfo', {}, '')).data.initialized, false);
  assert.equal((await rpc('setup', { setupToken:'wrong' }, '')).status, 403);
  assert.equal((await rpc('setup', { setupToken:'test-setup-token', username:'admin', password:'test-password', full_name:'ผู้ดูแล' }, '')).ok, true);
  assert.equal((await rpc('setup', { setupToken:'test-setup-token' }, '')).status, 409);
  assert.equal((await rpc('login', { username:'admin', password:'bad-password' }, '')).ok, false);
  const login = await rpc('login', { username:'admin', password:'test-password' }, '');
  assert.equal(login.ok, true);
  assert.equal(login.data.token, 'cookie');
  assert.match(login.headers.get('Set-Cookie'), /HttpOnly; SameSite=Strict/);
  cookie = login.headers.get('Set-Cookie').split(';')[0];
  let state = (await rpc('bootstrap')).data;
  assert.equal(state.users[0].password_hash, undefined);
  const record = { fiscal_year_id:state.fiscalYears[0].id, money_type_id:state.moneyTypes[0].id, category_id:state.categories[0].id, description:'ทดสอบ', amount:12.34, month:10, year:2569 };
  const saved = await rpc('save', { table:'transactions', record });
  assert.equal(saved.ok, true);
  assert.equal((await rpc('save', { table:'transactions', record:{ ...record, id:saved.data.id, amount:20.25 } })).data.amount, 20.25);
  assert.equal((await rpc('save', { table:'transactions', record:{ ...record, amount:-1 } })).ok, false);
  assert.equal((await rpc('copyBudgets', { fromId:'missing', toId:'also-missing' })).ok, false);
  await rpc('save', { table:'users', record:{ username:'viewer', full_name:'ผู้ดู', role:'viewer', password:'viewer-password' } });
  const viewer = await rpc('login', { username:'viewer', password:'viewer-password' }, '');
  const viewerCookie = viewer.headers.get('Set-Cookie').split(';')[0];
  assert.equal((await rpc('save', { table:'transactions', record }, viewerCookie)).ok, false);
  assert.equal((await rpc('backup', {}, viewerCookie)).ok, false);
  const imported = await rpc('importTransactions', { rows:JSON.parse(fs.readFileSync('data/legacy-transactions.json','utf8')) });
  assert.equal(imported.data.inserted, 346);
  const backup = (await rpc('backup')).data;
  assert.equal(backup.transactions.length, 347);
  assert.equal((await rpc('remove', { table:'transactions', id:saved.data.id })).ok, true);
  assert.equal((await rpc('restore', { data:backup })).ok, true);
  assert.equal((await rpc('bootstrap')).data.transactions.length, 347);
  // Two stores read the same revision: only one may publish its changes.
  const a = await loadStore(db), b = await loadStore(db);
  a.insert('logs', [{ id:'race-a', timestamp:'', username:'a', action:'', target:'', detail:'' }]);
  b.insert('logs', [{ id:'race-b', timestamp:'', username:'b', action:'', target:'', detail:'' }]);
  assert.equal(await a.commit(), true);
  assert.equal(await b.commit(), false);
  assert.equal(await db.prepare('SELECT id FROM logs WHERE id=?').bind('race-b').first(), null);
  const bad = await loadStore(db);
  bad.insert('users', [{ ...backup.users[0], id:'duplicate-username' }]);
  bad.insert('logs', [{ id:'must-rollback', timestamp:'', username:'', action:'', target:'', detail:'' }]);
  await assert.rejects(() => bad.commit());
  assert.equal(await db.prepare('SELECT id FROM logs WHERE id=?').bind('must-rollback').first(), null);
  assert.equal((await rpc('logout')).ok, true);
  assert.equal((await rpc('bootstrap')).code, 'AUTH');
});
