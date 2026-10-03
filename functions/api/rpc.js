import CORE from '../../server/core.js';
import { loadStore } from '../../server/d1-store.js';
import { hashPassword } from '../../server/password.js';
import { createHash, timingSafeEqual } from 'node:crypto';

const reply = (body, status = 200, extra = {}) => Response.json(body, {
  status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra }
});
const secretMatches = (a, b) => {
  if (!a || !b) return false;
  return timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest());
};
const cookie = (token, secure, maxAge = 21600) => `budget_session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;

export async function onRequestPost({ request, env }) {
  if (!env.DB) return reply({ ok: false, error: 'ยังไม่ได้ตั้งค่า D1 binding ชื่อ DB' }, 503);
  const url = new URL(request.url);
  if (request.headers.get('Origin') && request.headers.get('Origin') !== url.origin) return reply({ ok: false, error: 'Origin ไม่ถูกต้อง' }, 403);
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return reply({ ok: false, error: 'ต้องใช้ JSON' }, 415);
  let input;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 5 * 1024 * 1024) return reply({ ok: false, error: 'ข้อมูลต้องไม่เกิน 5 MB กรุณาแบ่งไฟล์นำเข้า' }, 413);
    input = JSON.parse(raw);
    if (!input || typeof input.action !== 'string' || !input.payload || typeof input.payload !== 'object' || Array.isArray(input.payload)) throw new Error();
  } catch { return reply({ ok: false, error: 'รูปแบบข้อมูลไม่ถูกต้อง' }, 400); }
  const { action, payload } = input;
  const token = request.headers.get('Cookie')?.match(/(?:^|;\s*)budget_session=([a-f0-9]{40})/)?.[1] || '';
  try {
    if (action === 'login' || action === 'setup') {
      const key = createHash('sha256').update((request.headers.get('CF-Connecting-IP') || 'local') + '|' + action).digest('hex');
      const now = Date.now();
      const result = await env.DB.prepare(`INSERT INTO login_attempts(key,attempts,window_start) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET attempts=CASE WHEN window_start < ? THEN 1 ELSE attempts+1 END, window_start=CASE WHEN window_start < ? THEN excluded.window_start ELSE window_start END RETURNING attempts`).bind(key, now, now - 900000, now - 900000).first();
      if (result.attempts > 10) return reply({ ok: false, error: 'ลองเข้าสู่ระบบบ่อยเกินไป กรุณารอ 15 นาที' }, 429);
    }
    // Retry the whole operation after an optimistic-write conflict. Mutations in
    // a rejected batch are guarded by a unique nonce and cannot be applied.
    for (let attempt = 0; attempt < 3; attempt++) {
      const store = await loadStore(env.DB, token);
      let result;
      if (action === 'setup') {
        if (store.all('users').length) return reply({ ok: false, error: 'ระบบตั้งค่าแล้ว' }, 409);
        if (!secretMatches(String(payload.setupToken || ''), env.SETUP_TOKEN)) return reply({ ok: false, error: 'Setup token ไม่ถูกต้องหรือยังไม่ได้กำหนด SETUP_TOKEN' }, 403);
        if (!/^[a-z0-9._-]{3,30}$/.test(payload.username || '') || String(payload.password || '').length < 8 || !String(payload.full_name || '').trim()) return reply({ ok: false, error: 'กรุณากรอกชื่อผู้ใช้ ชื่อ-นามสกุล และรหัสผ่านอย่างน้อย 8 ตัว' }, 400);
        CORE.seedDefaults(store, []);
        const admin = store.all('users')[0];
        Object.assign(admin, { username: payload.username, full_name: String(payload.full_name).trim(), password_hash: hashPassword(payload.password) });
        store.update('users', admin);
        result = { ok: true, data: true };
      } else {
        result = CORE.dispatch(store, action, payload, token);
        if (action === 'publicInfo' && result.ok) result.data.initialized = store.all('users').length > 0;
      }
      if (!result.ok) return reply(result, result.code === 'AUTH' ? 401 : 400);
      if (!await store.commit()) continue;
      const headers = {};
      if (action === 'login') {
        headers['Set-Cookie'] = cookie(result.data.token, url.protocol === 'https:');
        result.data.token = 'cookie'; // The original UI only needs a signed-in marker.
      }
      if (action === 'logout') headers['Set-Cookie'] = cookie('', url.protocol === 'https:', 0);
      return reply(result, 200, headers);
    }
    return reply({ ok: false, error: 'มีผู้ใช้อื่นกำลังบันทึกข้อมูล กรุณาลองใหม่' }, 409);
  } catch (error) {
    console.error('D1 RPC failure', error);
    return reply({ ok: false, error: 'ติดต่อฐานข้อมูลไม่ได้ กรุณาตรวจสอบ D1 binding และรัน migrations' }, 503);
  }
}

export const onRequestGet = () => reply({ ok: false, error: 'ใช้ POST สำหรับ API นี้' }, 405, { Allow: 'POST' });
