import fs from 'node:fs';
import CORE from '../server/core.js';
const numeric = new Set(['amount', 'year', 'month', 'sort', 'active', 'is_active']);
let sql = '-- D1 schema for the original Apps Script data model.\n';
for (const [table, { cols }] of Object.entries(CORE.TABLES)) {
  sql += `CREATE TABLE IF NOT EXISTS "${table}" (\n${cols.map(c => `  "${c}" ${c === 'id' ? 'TEXT PRIMARY KEY' : numeric.has(c) ? 'REAL NOT NULL DEFAULT 0' : "TEXT NOT NULL DEFAULT ''"}`).join(',\n')}\n);\n`;
}
sql += `
CREATE UNIQUE INDEX IF NOT EXISTS users_username ON users(username COLLATE NOCASE);
CREATE INDEX IF NOT EXISTS transactions_fy ON transactions(fiscal_year_id, money_type_id, category_id);
CREATE INDEX IF NOT EXISTS budgets_fy ON budgets(fiscal_year_id);
CREATE INDEX IF NOT EXISTS logs_time ON logs(timestamp);
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS sessions_expiry ON sessions(expires_at);
CREATE TABLE IF NOT EXISTS app_revision (id INTEGER PRIMARY KEY CHECK(id=1), version INTEGER NOT NULL, nonce TEXT NOT NULL);
INSERT OR IGNORE INTO app_revision VALUES(1,0,'');
CREATE TABLE IF NOT EXISTS login_attempts (key TEXT PRIMARY KEY, attempts INTEGER NOT NULL, window_start INTEGER NOT NULL);
`;
fs.mkdirSync('migrations', { recursive: true });
fs.writeFileSync('migrations/0001_initial.sql', sql);
