-- D1 schema for the original Apps Script data model.
CREATE TABLE IF NOT EXISTS "users" (
  "id" TEXT PRIMARY KEY,
  "username" TEXT NOT NULL DEFAULT '',
  "password_hash" TEXT NOT NULL DEFAULT '',
  "full_name" TEXT NOT NULL DEFAULT '',
  "position" TEXT NOT NULL DEFAULT '',
  "role" TEXT NOT NULL DEFAULT '',
  "active" REAL NOT NULL DEFAULT 0,
  "created_at" TEXT NOT NULL DEFAULT '',
  "updated_at" TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS "fiscalYears" (
  "id" TEXT PRIMARY KEY,
  "year" REAL NOT NULL DEFAULT 0,
  "name" TEXT NOT NULL DEFAULT '',
  "start_date" TEXT NOT NULL DEFAULT '',
  "end_date" TEXT NOT NULL DEFAULT '',
  "is_active" REAL NOT NULL DEFAULT 0,
  "note" TEXT NOT NULL DEFAULT '',
  "created_at" TEXT NOT NULL DEFAULT '',
  "updated_at" TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS "moneyTypes" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT '',
  "code" TEXT NOT NULL DEFAULT '',
  "color" TEXT NOT NULL DEFAULT '',
  "sort" REAL NOT NULL DEFAULT 0,
  "active" REAL NOT NULL DEFAULT 0,
  "note" TEXT NOT NULL DEFAULT '',
  "created_at" TEXT NOT NULL DEFAULT '',
  "updated_at" TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS "categories" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT '',
  "code" TEXT NOT NULL DEFAULT '',
  "color" TEXT NOT NULL DEFAULT '',
  "sort" REAL NOT NULL DEFAULT 0,
  "active" REAL NOT NULL DEFAULT 0,
  "note" TEXT NOT NULL DEFAULT '',
  "created_at" TEXT NOT NULL DEFAULT '',
  "updated_at" TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS "budgets" (
  "id" TEXT PRIMARY KEY,
  "fiscal_year_id" TEXT NOT NULL DEFAULT '',
  "money_type_id" TEXT NOT NULL DEFAULT '',
  "category_id" TEXT NOT NULL DEFAULT '',
  "amount" REAL NOT NULL DEFAULT 0,
  "note" TEXT NOT NULL DEFAULT '',
  "created_at" TEXT NOT NULL DEFAULT '',
  "updated_at" TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS "transactions" (
  "id" TEXT PRIMARY KEY,
  "fiscal_year_id" TEXT NOT NULL DEFAULT '',
  "money_type_id" TEXT NOT NULL DEFAULT '',
  "category_id" TEXT NOT NULL DEFAULT '',
  "voucher_no" TEXT NOT NULL DEFAULT '',
  "doc_date" TEXT NOT NULL DEFAULT '',
  "description" TEXT NOT NULL DEFAULT '',
  "amount" REAL NOT NULL DEFAULT 0,
  "month" REAL NOT NULL DEFAULT 0,
  "year" REAL NOT NULL DEFAULT 0,
  "status" TEXT NOT NULL DEFAULT '',
  "note" TEXT NOT NULL DEFAULT '',
  "created_by" TEXT NOT NULL DEFAULT '',
  "created_at" TEXT NOT NULL DEFAULT '',
  "updated_at" TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS "logs" (
  "id" TEXT PRIMARY KEY,
  "timestamp" TEXT NOT NULL DEFAULT '',
  "username" TEXT NOT NULL DEFAULT '',
  "action" TEXT NOT NULL DEFAULT '',
  "target" TEXT NOT NULL DEFAULT '',
  "detail" TEXT NOT NULL DEFAULT ''
);

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
