import { randomBytes } from 'node:crypto';
import { hashPassword, verifyPassword } from './password.js';
var CORE = (function () {
  'use strict';

  var SETTINGS_SHEET = 'ตั้งค่า';
  var TABLES = {
    users:        { sheet: 'ผู้ใช้งาน',        prefix: 'U',  cols: ['id','username','password_hash','full_name','position','role','active','created_at','updated_at'] },
    fiscalYears:  { sheet: 'ปีงบประมาณ',      prefix: 'FY', cols: ['id','year','name','start_date','end_date','is_active','note','created_at','updated_at'] },
    moneyTypes:   { sheet: 'ประเภทเงิน',       prefix: 'MT', cols: ['id','name','code','color','sort','active','note','created_at','updated_at'] },
    categories:   { sheet: 'หมวดรายจ่าย',      prefix: 'EC', cols: ['id','name','code','color','sort','active','note','created_at','updated_at'] },
    budgets:      { sheet: 'งบจัดสรร',         prefix: 'B',  cols: ['id','fiscal_year_id','money_type_id','category_id','amount','note','created_at','updated_at'] },
    transactions: { sheet: 'รายการเบิกจ่าย',   prefix: 'T',  cols: ['id','fiscal_year_id','money_type_id','category_id','voucher_no','doc_date','description','amount','month','year','status','note','created_by','created_at','updated_at'] },
    logs:         { sheet: 'ประวัติการใช้งาน', prefix: 'L',  cols: ['id','timestamp','username','action','target','detail'] }
  };
  var NUM = { year: 1, sort: 1, amount: 1, month: 1 };
  var BOOL = { active: 1, is_active: 1 };
  var ROLES = { admin: 'ผู้ดูแลระบบ', staff: 'เจ้าหน้าที่การเงิน', viewer: 'ผู้บริหาร/ดูรายงาน' };
  var STATUSES = ['จ่ายแล้ว', 'รอเบิกจ่าย', 'ยกเลิก'];
  var TABLE_LABEL = { users: 'ผู้ใช้งาน', fiscalYears: 'ปีงบประมาณ', moneyTypes: 'ประเภทเงิน', categories: 'หมวดรายจ่าย', budgets: 'งบจัดสรร', transactions: 'รายการเบิกจ่าย' };
  var SETTING_KEYS = ['school_name','affiliation','address','logo','system_name','reporter_user_id','reporter_name','reporter_position','director_name','director_position','finance_name','finance_position','warn_percent','active_fiscal_year_id'];
  var DEFAULT_SETTINGS = {
    school_name: 'โรงเรียนสตูลวิทยา',
    affiliation: 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน',
    address: '',
    logo: '',
    system_name: 'ระบบติดตามงบประมาณค่าใช้สอย',
    reporter_user_id: '',
    reporter_name: '',
    reporter_position: '',
    director_name: '',
    director_position: 'ผู้อำนวยการโรงเรียน',
    finance_name: '',
    finance_position: 'เจ้าหน้าที่การเงิน',
    warn_percent: '80'
  };
  var DEFAULT_MONEY = [
    ['เงินอุดหนุน', 'SUB', '#0C7C82'],
    ['เงินรายได้', 'INC', '#0288D1'],
    ['เงินกิจกรรมพัฒนาผู้เรียน', 'ACT', '#F57C00'],
    ['เงินอื่นๆ', 'OTH', '#4A2C6D']
  ];
  var DEFAULT_CATS = [
    ['ค่าตอบแทน', 'C1', '#FFCA28'],
    ['ค่าใช้สอย', 'C2', '#35B4B0'],
    ['ค่าวัสดุ', 'C3', '#26A69A'],
    ['ค่าสาธารณูปโภค', 'C4', '#0288D1'],
    ['ค่าครุภัณฑ์', 'C5', '#4A2C6D'],
    ['ลูกจ้างชั่วคราว', 'C6', '#FF8A65'],
    ['รายจ่ายอื่น', 'C7', '#EF5350'],
    ['ภาษีหัก ณ ที่จ่าย', 'C8', '#FBC02D']
  ];
  var PERMS = {
    viewer: { bootstrap: 1, logout: 1, changePassword: 1, publicInfo: 1 },
    staff:  { bootstrap: 1, logout: 1, changePassword: 1, publicInfo: 1, save: 1, remove: 1, importTransactions: 1, copyBudgets: 1 },
    admin:  '*'
  };
  var STAFF_TABLES = { budgets: 1, transactions: 1 };

  /* ---------- SHA-256 (pure JS, UTF-8) ---------- */
  function sha256(ascii) {
    function rr(v, a) { return (v >>> a) | (v << (32 - a)); }
    var str = unescape(encodeURIComponent(String(ascii)));
    var maxWord = Math.pow(2, 32), result = '', words = [], bitLen = str.length * 8;
    var hash = [], k = [], primeCounter = 0, isComposite = {};
    for (var cand = 2; primeCounter < 64; cand++) {
      if (!isComposite[cand]) {
        for (var i = 0; i < 313; i += cand) isComposite[i] = cand;
        hash[primeCounter] = (Math.pow(cand, .5) * maxWord) | 0;
        k[primeCounter++] = (Math.pow(cand, 1 / 3) * maxWord) | 0;
      }
    }
    hash = hash.slice(0, 8);
    str += '\x80';
    while (str.length % 64 - 56) str += '\x00';
    for (i = 0; i < str.length; i++) {
      var j = str.charCodeAt(i);
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words.length] = ((bitLen / maxWord) | 0);
    words[words.length] = (bitLen);
    for (j = 0; j < words.length;) {
      var w = words.slice(j, j += 16), oldHash = hash;
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2], a = hash[0], e = hash[4];
        var temp1 = hash[7] + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i] +
          (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rr(w15, 7) ^ rr(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rr(w2, 17) ^ rr(w2, 19) ^ (w2 >>> 10))) | 0);
        var temp2 = (rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }
      for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
    }
    for (i = 0; i < 8; i++) for (j = 3; j + 1; j--) {
      var b = (hash[i] >> (j * 8)) & 255;
      result += ((b < 16) ? 0 : '') + b.toString(16);
    }
    return result;
  }

  /* ---------- helpers ---------- */
  function rand(n) { return randomBytes(n).toString('hex').slice(0, n); }
  function newId(t) { return TABLES[t].prefix + Date.now().toString(36).toUpperCase() + rand(4).toUpperCase(); }
  function nowISO() { return new Date().toISOString(); }
  function str(v) { return v === null || v === undefined ? '' : String(v).trim(); }
  function num(v) { if (v === '' || v === null || v === undefined) return 0; var n = Number(String(v).replace(/,/g, '')); return isNaN(n) ? 0 : n; }
  function bool(v) { return v === true || v === 1 || v === '1' || String(v).toUpperCase() === 'TRUE'; }
  function fail(msg) { throw new Error(msg); }
  function hashPw(pw) { return hashPassword(pw); }
  function checkPw(pw, stored) { return verifyPassword(pw, stored); }
  function fiscalOf(month, year) { month = Number(month); year = Number(year); return month >= 10 ? year + 1 : year; }
  function fyDates(beYear) { var g = Number(beYear) - 543; return { start: (g - 1) + '-10-01', end: g + '-09-30' }; }
  function round2(n) { return Math.round((num(n) + Number.EPSILON) * 100) / 100; }

  function normalize(t, r) {
    var o = {}, cols = TABLES[t].cols;
    for (var i = 0; i < cols.length; i++) {
      var c = cols[i], v = r[c];
      if (NUM[c]) o[c] = num(v);
      else if (BOOL[c]) o[c] = bool(v);
      else o[c] = str(v);
    }
    return o;
  }
  function all(store, t) { return store.all(t).map(function (r) { return normalize(t, r); }).filter(function (r) { return r.id; }); }
  function byId(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }
  function sanitizeUser(u) { if (!u) return null; var o = {}; for (var k in u) if (k !== 'password_hash') o[k] = u[k]; return o; }

  /* ---------- settings (รองรับค่าที่ยาวเกิน 50,000 ตัวอักษร เช่นโลโก้) ---------- */
  function getSettings(store) {
    var raw = store.getSettingsRaw() || {}, out = {}, chunks = {};
    Object.keys(raw).forEach(function (k) {
      var m = k.match(/^(.+)__(\d+)$/);
      if (m) { (chunks[m[1]] = chunks[m[1]] || [])[Number(m[2])] = str(raw[k]); }
      else out[k] = raw[k] === null || raw[k] === undefined ? '' : String(raw[k]);
    });
    Object.keys(chunks).forEach(function (k) { out[k] = chunks[k].join(''); });
    Object.keys(DEFAULT_SETTINGS).forEach(function (k) { if (out[k] === undefined) out[k] = DEFAULT_SETTINGS[k]; });
    return out;
  }
  function setSettings(store, patch) {
    var cur = getSettings(store);
    Object.keys(patch).forEach(function (k) { if (SETTING_KEYS.indexOf(k) >= 0) cur[k] = str(patch[k]); });
    var raw = {}, LIM = 40000;
    Object.keys(cur).forEach(function (k) {
      var v = String(cur[k]);
      if (v.length > LIM) { for (var i = 0, n = 0; i < v.length; i += LIM, n++) raw[k + '__' + n] = v.substr(i, LIM); }
      else raw[k] = v;
    });
    store.setSettingsRaw(raw);
    return getSettings(store);
  }

  function log(store, user, action, target, detail) {
    try {
      store.insert('logs', [{ id: newId('logs'), timestamp: nowISO(), username: user ? user.username : '-', action: action, target: target || '', detail: String(detail || '').substr(0, 400) }]);
    } catch (e) { /* ไม่ให้การบันทึกประวัติทำให้ระบบล้ม */ }
  }

  /* ---------- auth ---------- */
  function login(store, p) {
    var u = str(p.username).toLowerCase().replace(/\s+/g, ''), pw = String(p.password || '');
    if (!u || !pw) fail('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
    var user = all(store, 'users').filter(function (x) { return x.username.toLowerCase() === u; })[0];
    if (!user || !(checkPw(pw, user.password_hash) || (pw.trim() !== pw && checkPw(pw.trim(), user.password_hash)))) fail('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    if (!user.active) fail('บัญชีนี้ถูกปิดการใช้งาน กรุณาติดต่อผู้ดูแลระบบ');
    var token = rand(40);
    store.sessionPut(token, user.id);
    log(store, user, 'เข้าสู่ระบบ', '', '');
    return { token: token, user: sanitizeUser(user) };
  }
  function auth(store, token) {
    if (!token) return null;
    var id = store.sessionGet(token);
    if (!id) return null;
    var u = byId(all(store, 'users'), id);
    return u && u.active ? u : null;
  }
  function allowed(user, action, p) {
    var pr = PERMS[user.role] || PERMS.viewer;
    if (pr === '*') return true;
    if (!pr[action]) return false;
    if ((action === 'save' || action === 'remove') && !STAFF_TABLES[p.table]) return false;
    return true;
  }

  /* ---------- validation & save ---------- */
  function uniqueCheck(list, field, value, selfId, label) {
    var v = String(value).toLowerCase();
    if (list.some(function (r) { return String(r[field]).toLowerCase() === v && r.id !== selfId; })) fail(label + ' "' + value + '" มีอยู่แล้วในระบบ');
  }

  function prepare(store, t, input, user) {
    var list = all(store, t), isNew = !input.id, old = isNew ? null : byId(list, input.id);
    if (!isNew && !old) fail('ไม่พบข้อมูลที่ต้องการแก้ไข อาจถูกลบไปแล้ว');
    var r = normalize(t, Object.assign({}, old || {}, input));
    var now = nowISO();
    if (isNew) { r.id = newId(t); r.created_at = now; }
    r.updated_at = now;

    if (t === 'fiscalYears') {
      if (!r.year || r.year < 2400 || r.year > 2800) fail('กรุณาระบุปีงบประมาณเป็น พ.ศ. เช่น 2569');
      uniqueCheck(list, 'year', r.year, r.id, 'ปีงบประมาณ');
      var d = fyDates(r.year);
      if (!r.name) r.name = 'ปีงบประมาณ ' + r.year;
      if (!r.start_date) r.start_date = d.start;
      if (!r.end_date) r.end_date = d.end;
      if (r.start_date > r.end_date) fail('วันเริ่มต้นต้องอยู่ก่อนวันสิ้นสุด');
      if (!list.length) r.is_active = true;
    }
    if (t === 'moneyTypes' || t === 'categories') {
      if (!r.name) fail('กรุณากรอกชื่อ' + TABLE_LABEL[t]);
      uniqueCheck(list, 'name', r.name, r.id, TABLE_LABEL[t]);
      if (!/^#[0-9a-fA-F]{6}$/.test(r.color)) r.color = '#0C7C82';
      if (isNew && !r.sort) r.sort = list.reduce(function (m, x) { return Math.max(m, x.sort); }, 0) + 1;
      if (isNew && input.active === undefined) r.active = true;
    }
    if (t === 'budgets') {
      if (!byId(all(store, 'fiscalYears'), r.fiscal_year_id)) fail('กรุณาเลือกปีงบประมาณ');
      if (!byId(all(store, 'moneyTypes'), r.money_type_id)) fail('กรุณาเลือกประเภทเงิน');
      if (r.category_id && !byId(all(store, 'categories'), r.category_id)) fail('ไม่พบหมวดรายจ่ายที่เลือก');
      if (r.amount < 0) fail('จำนวนเงินต้องไม่ติดลบ');
      r.amount = round2(r.amount);
      if (list.some(function (b) { return b.id !== r.id && b.fiscal_year_id === r.fiscal_year_id && b.money_type_id === r.money_type_id && b.category_id === r.category_id; }))
        fail('มีการจัดสรรงบของประเภทเงินและหมวดนี้ในปีงบประมาณนี้แล้ว กรุณาแก้ไขรายการเดิม');
    }
    if (t === 'transactions') {
      if (!byId(all(store, 'fiscalYears'), r.fiscal_year_id)) fail('กรุณาเลือกปีงบประมาณ');
      if (!byId(all(store, 'moneyTypes'), r.money_type_id)) fail('กรุณาเลือกประเภทเงิน');
      if (!byId(all(store, 'categories'), r.category_id)) fail('กรุณาเลือกหมวดรายจ่าย');
      if (!r.description) fail('กรุณากรอกรายละเอียดรายการ');
      if (!(r.amount > 0)) fail('จำนวนเงินต้องมากกว่า 0');
      r.amount = round2(r.amount);
      if (r.doc_date && /^\d{4}-\d{2}-\d{2}$/.test(r.doc_date)) { r.month = Number(r.doc_date.substr(5, 2)); r.year = Number(r.doc_date.substr(0, 4)) + 543; }
      if (r.month < 1 || r.month > 12) fail('กรุณาเลือกเดือน');
      if (!r.year) fail('กรุณาระบุปี พ.ศ.');
      if (STATUSES.indexOf(r.status) < 0) r.status = 'จ่ายแล้ว';
      if (isNew) r.created_by = user ? user.username : '';
    }
    if (t === 'users') {
      r.username = r.username.toLowerCase();
      if (!/^[a-z0-9._-]{3,30}$/.test(r.username)) fail('ชื่อผู้ใช้ใช้ได้เฉพาะ a-z 0-9 . _ - ความยาว 3-30 ตัว');
      uniqueCheck(list, 'username', r.username, r.id, 'ชื่อผู้ใช้');
      if (!r.full_name) fail('กรุณากรอกชื่อ-นามสกุล');
      if (!ROLES[r.role]) r.role = 'staff';
      if (isNew && input.active === undefined) r.active = true;
      var pw = String(input.password || '');
      if (isNew && pw.length < 8) fail('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
      if (pw) { if (pw.length < 8) fail('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'); r.password_hash = hashPw(pw); }
      else if (old) r.password_hash = old.password_hash;
      if (old && old.role === 'admin' && (r.role !== 'admin' || !r.active)) {
        var admins = list.filter(function (x) { return x.role === 'admin' && x.active; });
        if (admins.length <= 1) fail('ต้องมีผู้ดูแลระบบที่ใช้งานได้อย่างน้อย 1 คน');
      }
      if (user && old && old.id === user.id && !r.active) fail('ไม่สามารถปิดการใช้งานบัญชีของตนเองได้');
    }
    return { rec: r, isNew: isNew, old: old };
  }

  function save(store, p, user) {
    var t = p.table;
    if (!TABLE_LABEL[t]) fail('ตารางข้อมูลไม่ถูกต้อง');
    var res = prepare(store, t, p.record || {}, user), r = res.rec;
    if (t === 'fiscalYears' && r.is_active) {
      all(store, 'fiscalYears').forEach(function (f) { if (f.id !== r.id && f.is_active) { f.is_active = false; store.update('fiscalYears', f); } });
    }
    if (res.isNew) store.insert(t, [r]); else store.update(t, r);
    var label = r.name || r.description || r.username || r.voucher_no || r.year || r.id;
    log(store, user, res.isNew ? 'เพิ่มข้อมูล' : 'แก้ไขข้อมูล', TABLE_LABEL[t], label + (t === 'transactions' || t === 'budgets' ? ' (' + r.amount + ' บาท)' : ''));
    return t === 'users' ? sanitizeUser(r) : r;
  }

  function remove(store, p, user) {
    var t = p.table, ids = p.ids || (p.id ? [p.id] : []);
    if (!TABLE_LABEL[t]) fail('ตารางข้อมูลไม่ถูกต้อง');
    if (!ids.length) fail('ไม่ได้เลือกรายการที่ต้องการลบ');
    var list = all(store, t), targets = list.filter(function (r) { return ids.indexOf(r.id) >= 0; });
    if (!targets.length) fail('ไม่พบข้อมูลที่ต้องการลบ');
    var cascade = { budgets: 0, transactions: 0 };

    if (t === 'moneyTypes' || t === 'categories') {
      var f = t === 'moneyTypes' ? 'money_type_id' : 'category_id';
      var used = all(store, 'transactions').filter(function (x) { return ids.indexOf(x[f]) >= 0; }).length;
      var usedB = all(store, 'budgets').filter(function (x) { return ids.indexOf(x[f]) >= 0; }).length;
      if (used || usedB) fail('ลบไม่ได้ เพราะมีรายการเบิกจ่าย ' + used + ' รายการ และงบจัดสรร ' + usedB + ' รายการที่ใช้' + TABLE_LABEL[t] + 'นี้อยู่ แนะนำให้ปิดการใช้งานแทน');
    }
    if (t === 'users') {
      if (user && ids.indexOf(user.id) >= 0) fail('ไม่สามารถลบบัญชีของตนเองได้');
      var remainAdmins = list.filter(function (x) { return x.role === 'admin' && x.active && ids.indexOf(x.id) < 0; });
      if (!remainAdmins.length) fail('ต้องมีผู้ดูแลระบบที่ใช้งานได้อย่างน้อย 1 คน');
    }
    if (t === 'fiscalYears') {
      ['budgets', 'transactions'].forEach(function (ct) {
        var rm = all(store, ct).filter(function (x) { return ids.indexOf(x.fiscal_year_id) >= 0; }).map(function (x) { return x.id; });
        cascade[ct] = rm.length;
        if (rm.length) store.remove(ct, rm);
      });
    }
    store.remove(t, ids);
    if (t === 'fiscalYears') {
      var rest = all(store, 'fiscalYears');
      if (rest.length && !rest.some(function (x) { return x.is_active; })) {
        rest.sort(function (a, b) { return b.year - a.year; });
        rest[0].is_active = true; store.update('fiscalYears', rest[0]);
      }
    }
    var names = targets.slice(0, 5).map(function (r) { return r.name || r.description || r.username || r.year || r.id; }).join(', ');
    log(store, user, 'ลบข้อมูล', TABLE_LABEL[t], targets.length + ' รายการ: ' + names);
    return { removed: targets.length, cascade: cascade };
  }

  function setActiveYear(store, p, user) {
    var list = all(store, 'fiscalYears'), target = byId(list, p.id);
    if (!target) fail('ไม่พบปีงบประมาณ');
    list.forEach(function (f) { var want = f.id === p.id; if (f.is_active !== want) { f.is_active = want; f.updated_at = nowISO(); store.update('fiscalYears', f); } });
    log(store, user, 'ตั้งปีงบประมาณปัจจุบัน', 'ปีงบประมาณ', target.year);
    return true;
  }

  function copyBudgets(store, p, user) {
    var from = p.fromId, to = p.toId;
    if (!byId(all(store, 'fiscalYears'), from) || !byId(all(store, 'fiscalYears'), to)) fail('ไม่พบปีงบประมาณ');
    if (!from || !to || from === to) fail('กรุณาเลือกปีงบประมาณต้นทางและปลายทางให้ถูกต้อง');
    var list = all(store, 'budgets'), now = nowISO(), add = [];
    list.filter(function (b) { return b.fiscal_year_id === from; }).forEach(function (b) {
      var exists = list.some(function (x) { return x.fiscal_year_id === to && x.money_type_id === b.money_type_id && x.category_id === b.category_id; });
      if (!exists) add.push({ id: newId('budgets'), fiscal_year_id: to, money_type_id: b.money_type_id, category_id: b.category_id, amount: b.amount, note: b.note, created_at: now, updated_at: now });
    });
    if (add.length) store.insert('budgets', add);
    log(store, user, 'คัดลอกงบจัดสรร', 'งบจัดสรร', add.length + ' รายการ');
    return { copied: add.length };
  }

  /* ---------- import ---------- */
  function importTransactions(store, p, user) {
    var rows = p.rows || [], createMissing = p.createMissing !== false;
    var mts = all(store, 'moneyTypes'), cats = all(store, 'categories'), fys = all(store, 'fiscalYears');
    var created = { moneyTypes: 0, categories: 0, fiscalYears: 0 }, errors = [], out = [], now = nowISO();
    var palette = ['#0C7C82','#35B4B0','#26A69A','#AED581','#FFCA28','#FF8A65','#EF5350','#4A2C6D','#D32F2F','#F57C00','#FBC02D','#0288D1'];
    function findOrCreate(list, t, name) {
      name = str(name);
      var f = list.filter(function (x) { return x.name === name; })[0];
      if (f || !createMissing || !name) return f;
      var r = normalize(t, { id: newId(t), name: name, color: palette[list.length % palette.length], sort: list.length + 1, active: true, created_at: now, updated_at: now });
      store.insert(t, [r]); list.push(r); created[t]++;
      return r;
    }
    function fyFor(beYear) {
      var f = fys.filter(function (x) { return x.year === beYear; })[0];
      if (f || !createMissing) return f;
      var d = fyDates(beYear);
      var r = normalize('fiscalYears', { id: newId('fiscalYears'), year: beYear, name: 'ปีงบประมาณ ' + beYear, start_date: d.start, end_date: d.end, is_active: !fys.length, created_at: now, updated_at: now });
      store.insert('fiscalYears', [r]); fys.push(r); created.fiscalYears++;
      return r;
    }
    rows.forEach(function (row, i) {
      var line = (row._line || i + 2);
      var mt = findOrCreate(mts, 'moneyTypes', row.money_type);
      var ct = findOrCreate(cats, 'categories', row.expense_category);
      var month = num(row.month), year = num(row.year), amount = round2(row.amount);
      if (year && year < 2400) year += 543;
      if (!mt) { errors.push('แถว ' + line + ': ไม่พบประเภทเงิน "' + str(row.money_type) + '"'); return; }
      if (!ct) { errors.push('แถว ' + line + ': ไม่พบหมวดรายจ่าย "' + str(row.expense_category) + '"'); return; }
      if (!(amount > 0)) { errors.push('แถว ' + line + ': จำนวนเงินไม่ถูกต้อง'); return; }
      if (month < 1 || month > 12 || !year) { errors.push('แถว ' + line + ': เดือน/ปีไม่ถูกต้อง'); return; }
      var fyYear = num(row.fiscal_year) || fiscalOf(month, year);
      var fy = fyFor(fyYear);
      if (!fy) { errors.push('แถว ' + line + ': ไม่พบปีงบประมาณ ' + fyYear); return; }
      out.push(normalize('transactions', {
        id: newId('transactions') + i, fiscal_year_id: fy.id, money_type_id: mt.id, category_id: ct.id,
        voucher_no: row.voucher_no, doc_date: row.doc_date || '', description: str(row.description) || '-', amount: amount,
        month: month, year: year, status: STATUSES.indexOf(str(row.status)) >= 0 ? str(row.status) : 'จ่ายแล้ว',
        note: row.note || '', created_by: user ? user.username : 'import',
        created_at: str(row.created_at) || now, updated_at: now
      }));
    });
    if (out.length) store.insert('transactions', out);
    if (user) log(store, user, 'นำเข้าข้อมูล', 'รายการเบิกจ่าย', out.length + ' รายการ' + (errors.length ? ' (ข้าม ' + errors.length + ')' : ''));
    return { inserted: out.length, created: created, errors: errors.slice(0, 50), errorCount: errors.length };
  }

  /* ---------- bootstrap & misc ---------- */
  function publicInfo(store) {
    var s = getSettings(store);
    return { school_name: s.school_name, affiliation: s.affiliation, logo: s.logo, system_name: s.system_name };
  }
  function bootstrap(store, p, user) {
    var users = all(store, 'users').map(sanitizeUser);
    if (user.role !== 'admin') users = users.map(function (u) { return { id: u.id, username: u.username, full_name: u.full_name, position: u.position, role: u.role, active: u.active }; });
    return {
      user: sanitizeUser(user), settings: getSettings(store), users: users,
      fiscalYears: all(store, 'fiscalYears'), moneyTypes: all(store, 'moneyTypes'), categories: all(store, 'categories'),
      budgets: all(store, 'budgets'), transactions: all(store, 'transactions'), serverTime: nowISO()
    };
  }
  function changePassword(store, p, user) {
    if (!checkPw(String(p.oldPassword || ''), user.password_hash)) fail('รหัสผ่านเดิมไม่ถูกต้อง');
    var np = String(p.newPassword || '');
    if (np.length < 8) fail('รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร');
    user.password_hash = hashPw(np); user.updated_at = nowISO();
    store.update('users', user);
    log(store, user, 'เปลี่ยนรหัสผ่าน', 'ผู้ใช้งาน', user.username);
    return true;
  }
  function saveProfile(store, p, user) {
    if (!str(p.full_name)) fail('กรุณากรอกชื่อ-นามสกุล');
    user.full_name = str(p.full_name); user.position = str(p.position); user.updated_at = nowISO();
    store.update('users', user);
    log(store, user, 'แก้ไขข้อมูลส่วนตัว', 'ผู้ใช้งาน', user.username);
    return sanitizeUser(user);
  }
  function logs(store, p) {
    var l = all(store, 'logs');
    l.sort(function (a, b) { return a.timestamp < b.timestamp ? 1 : -1; });
    return l.slice(0, Math.min(num(p.limit) || 500, 2000));
  }
  function clearLogs(store, p, user) { store.replaceAll('logs', []); log(store, user, 'ล้างประวัติการใช้งาน', '', ''); return true; }
  function backup(store) {
    var o = { version: 1, exported_at: nowISO(), settings: getSettings(store) };
    Object.keys(TABLES).forEach(function (t) { if (t !== 'logs') o[t] = all(store, t); });
    return o;
  }
  function restore(store, p, user) {
    var d = p.data || {};
    if (!d.version || !d.users || !d.users.length) fail('ไฟล์สำรองข้อมูลไม่ถูกต้อง');
    if (!d.users.some(function (u) { return u.role === 'admin' && bool(u.active) && u.password_hash; })) fail('ไฟล์สำรองต้องมีผู้ดูแลระบบอย่างน้อย 1 คน');
    Object.keys(TABLES).forEach(function (t) { if (t !== 'logs' && d[t]) store.replaceAll(t, d[t].map(function (r) { return normalize(t, r); })); });
    if (d.settings) setSettings(store, d.settings);
    log(store, user, 'กู้คืนข้อมูล', 'ทั้งระบบ', 'จากไฟล์สำรอง ' + (d.exported_at || ''));
    return true;
  }
  function saveSettingsAct(store, p, user) {
    var s = setSettings(store, p.settings || {});
    log(store, user, 'บันทึกการตั้งค่า', 'ตั้งค่าระบบ', Object.keys(p.settings || {}).filter(function (k) { return k !== 'logo'; }).join(', ') + (p.settings && p.settings.logo !== undefined ? ', logo' : ''));
    return s;
  }

  function seedDefaults(store, seedRows) {
    var now = nowISO(), did = [];
    if (!all(store, 'users').length) {
      store.insert('users', [normalize('users', { id: newId('users'), username: 'admin', password_hash: hashPw(randomBytes(32).toString("hex")), full_name: 'ผู้ดูแลระบบ', position: 'ครู', role: 'admin', active: true, created_at: now, updated_at: now })]);
      did.push('users');
    }
    if (!all(store, 'moneyTypes').length) {
      store.insert('moneyTypes', DEFAULT_MONEY.map(function (m, i) { return normalize('moneyTypes', { id: 'MT' + (i + 1), name: m[0], code: m[1], color: m[2], sort: i + 1, active: true, created_at: now, updated_at: now }); }));
      did.push('moneyTypes');
    }
    if (!all(store, 'categories').length) {
      store.insert('categories', DEFAULT_CATS.map(function (m, i) { return normalize('categories', { id: 'EC' + (i + 1), name: m[0], code: m[1], color: m[2], sort: i + 1, active: true, created_at: now, updated_at: now }); }));
      did.push('categories');
    }
    if (!all(store, 'fiscalYears').length) {
      var d = fyDates(2569);
      store.insert('fiscalYears', [normalize('fiscalYears', { id: 'FY2569', year: 2569, name: 'ปีงบประมาณ 2569', start_date: d.start, end_date: d.end, is_active: true, created_at: now, updated_at: now })]);
      did.push('fiscalYears');
    }
    if (!Object.keys(store.getSettingsRaw() || {}).length) { setSettings(store, DEFAULT_SETTINGS); did.push('settings'); }
    if (seedRows && seedRows.length && !all(store, 'transactions').length) {
      importTransactions(store, {
        rows: seedRows.map(function (r, i) { return { money_type: r[0], expense_category: r[1], voucher_no: r[2], description: r[3], amount: r[4], month: r[5], year: r[6], created_at: r[7], _line: i + 2 }; })
      }, null);
      did.push('transactions');
    }
    return did;
  }

  var ACTIONS = {
    bootstrap: bootstrap, save: save, remove: remove, setActiveYear: setActiveYear, copyBudgets: copyBudgets,
    importTransactions: importTransactions, changePassword: changePassword, saveProfile: saveProfile,
    logs: logs, clearLogs: clearLogs, backup: backup, restore: restore, saveSettings: saveSettingsAct,
    logout: function (store, p, user, token) { store.sessionDel(token); log(store, user, 'ออกจากระบบ', '', ''); return true; }
  };
  var READONLY = { bootstrap: 1, logs: 1, backup: 1, publicInfo: 1 };

  function dispatch(store, action, p, token) {
    p = p || {};
    try {
      if (action === 'login') return { ok: true, data: login(store, p) };
      if (action === 'publicInfo') return { ok: true, data: publicInfo(store) };
      var user = auth(store, token);
      if (!user) return { ok: false, code: 'AUTH', error: 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่' };
      if (!ACTIONS[action]) return { ok: false, error: 'ไม่รู้จักคำสั่ง ' + action };
      if (action !== 'saveProfile' && !allowed(user, action, p)) return { ok: false, error: 'คุณไม่มีสิทธิ์ใช้งานส่วนนี้' };
      return { ok: true, data: ACTIONS[action](store, p, user, token) };
    } catch (e) {
      return { ok: false, error: String(e && e.message ? e.message : e) };
    }
  }

  return {
    TABLES: TABLES, SETTINGS_SHEET: SETTINGS_SHEET, ROLES: ROLES, STATUSES: STATUSES, READONLY: READONLY,
    dispatch: dispatch, seedDefaults: seedDefaults, normalize: normalize, sha256: sha256, fiscalOf: fiscalOf, fyDates: fyDates
  };
})();



export default CORE;
