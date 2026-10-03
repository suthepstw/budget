import { pbkdf2Sync, randomBytes, timingSafeEqual, createHash } from 'node:crypto';

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const digest = pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString('hex');
  return `pbkdf2$100000$${salt}$${digest}`;
}

export function verifyPassword(password, stored = '') {
  const parts = stored.split('$');
  let actual, expected;
  if (parts[0] === 'pbkdf2' && parts.length === 4 && parts[1] === '100000') {
    actual = pbkdf2Sync(password, parts[2], 100000, 32, 'sha256');
    expected = Buffer.from(parts[3], 'hex');
  } else if (parts.length === 2) {
    // Old Apps Script backups can still be restored. New passwords use PBKDF2.
    actual = createHash('sha256').update(parts[0] + '|' + password).digest();
    expected = Buffer.from(parts[1], 'hex');
  } else return false;
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
