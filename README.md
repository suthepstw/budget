# Budget Tracker — Vite + Cloudflare Pages + D1

แปลงจาก `Index (2).html`, `Code (1).gs` และ `budget-tracker (1).html` รักษาหน้าตาภาษาไทยและฟังก์ชันเดิม ใช้ Vite สำหรับ JavaScript, Tailwind ที่ compile ตอน build และ Cloudflare Pages Functions สำหรับ API ข้อมูลบันทึกใน D1 แทน Google Sheets ต้นฉบับใน Downloads ไม่ได้ถูกแก้ไข ตัวอย่าง Vue starter ไม่ได้ใช้ในหน้าเว็บนี้

รองรับแดชบอร์ด กราฟ งบจัดสรร รายการเบิกจ่าย ปีงบประมาณ พ.ศ. ประเภทเงิน หมวดรายจ่าย รายงานพิมพ์/Excel ผู้ใช้ admin/staff/viewer การตั้งค่า โลโก้ ประวัติ นำเข้า Excel/CSV และสำรอง/กู้คืน JSON

## เปิดใช้งานในเครื่อง

ใช้ Node.js 22.12+ และ npm:

```powershell
npm install
node scripts/init-local.mjs
npm run db:migrate:local
npm run dev:pages
```

เปิด http://127.0.0.1:8788 ระบบจะแสดงหน้าตั้งค่าครั้งแรก นำค่า `SETUP_TOKEN` จาก `.dev.vars` มากรอก แล้วเลือกชื่อผู้ใช้ ชื่อ-นามสกุล และรหัสผ่านของคุณเองอย่างน้อย 8 ตัว ไม่มีรหัสผ่าน admin เริ่มต้น ไฟล์ `.dev.vars` เป็น secret สำหรับเครื่องนี้และไม่ถูก commit สคริปต์ init จะรักษาไฟล์เดิมหากมีอยู่แล้ว

หากต้องการ Vite HMR ให้คง `npm run dev:pages` ไว้ แล้วเปิดอีกเทอร์มินัลรัน `npm run dev` หน้า Vite ที่ http://localhost:5173 จะ proxy `/api` ไปยัง Pages ที่พอร์ต 8788 ส่วน `npm run preview` แสดงเฉพาะไฟล์ static และไม่มี API ในตัว

## Deploy บน Cloudflare Pages

1. เข้าสู่ระบบและสร้างฐานข้อมูลจริง:

```powershell
npx wrangler login
npx wrangler d1 create budget-db
```

2. คัดลอก `database_id` ที่ Cloudflare แสดงไปแทน UUID ศูนย์ใน `wrangler.jsonc` โดยคงชื่อ binding `DB` แล้วสร้างตารางบนฐานข้อมูลจริง:

```powershell
npm run db:migrate:remote
```

3. สร้าง Pages project (เลือก production branch ให้ตรงกับ repository เช่น `main`):

```powershell
npx wrangler pages project create budget-tracker --production-branch main
npx wrangler pages secret put SETUP_TOKEN --project-name budget-tracker
```

คำสั่ง secret จะให้กรอก token: เลือกค่ายาวและสุ่มของคุณเองสำหรับ production เก็บไว้ใช้สร้างบัญชีครั้งแรก อย่าใส่ secret ใน `VITE_*` เพราะตัวแปรดังกล่าวจะถูกส่งไปยังเบราว์เซอร์

4. อัปโหลดทั้งหน้าเว็บและ Functions:

```powershell
npm run deploy
```

เปิด URL ที่ Wrangler ส่งกลับ ตั้งค่าบัญชี admin ครั้งแรกด้วย production `SETUP_TOKEN` หลังตั้งค่าแล้ว API setup จะปฏิเสธการสร้าง admin ซ้ำ สามารถลบ secret นี้จาก Pages dashboard ได้

หากใช้ Git integration ให้ push โปรเจกต์แล้วเชื่อม Cloudflare Pages ตั้ง build command เป็น `npm run build`, output directory เป็น `dist`, root เป็นโฟลเดอร์ที่มี `package.json` และตั้ง `SETUP_TOKEN` ใน Settings > Variables and Secrets ก่อน deploy ไฟล์ `functions/` ต้องอยู่ใน repository เพื่อให้ Pages build API ด้วย อย่าอัปโหลดเฉพาะ `dist` ด้วยการลากไฟล์ใน dashboard เพราะวิธีนั้นไม่ build Pages Functions

`wrangler.jsonc` กำหนด D1 binding `DB` และ Node compatibility แล้ว หากแยก preview deployment ให้กำหนดฐานข้อมูล preview แยกจาก production

**สถานะ:** ยังไม่ได้สร้าง D1 หรือ deploy ในบัญชี Cloudflare จริง UUID ใน config เป็น placeholder สำหรับ local ต้องเปลี่ยนก่อน deploy ข้อมูล local D1 จะไม่ย้ายขึ้น production อัตโนมัติ

## นำเข้าข้อมูลเดิม

ตรวจแล้วว่า Code.gs และ budget-tracker.html ฝังรายการเดียวกันทั้งหมด 346 รายการ จึงแยกไว้ใน:

- `data/legacy-transactions.csv` — เข้าระบบด้วย admin/staff > นำเข้า/ส่งออก > เลือก CSV นี้ ตรวจตัวอย่างและตัวเลือกข้ามรายการซ้ำก่อนยืนยัน
- `data/legacy-transactions.json` — รายการใน JSON สำหรับสคริปต์และการทดสอบ เป็นไฟล์นำเข้า ไม่ใช่ backup ของทั้งระบบ

ข้อมูลนี้ไม่ถูกรวมใน `dist` และไม่เผยแพร่เป็นไฟล์บนเว็บ ข้อมูลที่มีใน Google Sheets แต่ไม่ได้ฝังในไฟล์ที่ให้มา ต้อง export จากระบบเดิมเพิ่ม หากมี backup JSON จากระบบเดิม สามารถกู้คืนผ่านเมนู admin ได้ ระบบรองรับ password hash เดิม รหัสผ่านใหม่ใช้ PBKDF2

## โครงสร้าง

```text
index.html                    โครงหน้าเว็บเดิม
src/app.js                    UI และ fetch API
src/main.js                   โหลด libraries ผ่าน Vite
src/style.css                 Tailwind และรูปแบบเดิม
functions/api/rpc.js          POST /api/rpc, setup, auth, cookies
server/core.js                ตรรกะธุรกิจจาก Code.gs
server/d1-store.js            D1 snapshot และ atomic batch commit
server/password.js            PBKDF2 และรองรับ legacy hash
migrations/0001_initial.sql   schema D1
wrangler.jsonc                Pages/D1 configuration
data/                         ข้อมูลเดิมสำหรับนำเข้า
tests/api.test.mjs            ทดสอบ API บน workerd และ D1 จำลอง
```

## ตรวจสอบ

```powershell
npm run build
npm test
```

ทดสอบด้วย D1 ชั่วคราวแยกจาก local/production ตรวจ setup, login/logout, HttpOnly cookie, สิทธิ์ผู้ใช้, CRUD, จำนวนเงินไม่ถูกต้อง, นำเข้า 346 รายการ, backup/restore, การเขียนพร้อมกัน และ rollback เมื่อ batch ผิดพลาด

Session มีอายุ 6 ชั่วโมง เก็บ token ใน HttpOnly cookie; D1 เก็บเฉพาะ hash ของ token จำกัด login/setup 10 ครั้งต่อ IP ต่อ 15 นาที ข้อมูลการเงินไม่เก็บใน localStorage (เก็บเฉพาะตัวเลือก UI และสถานะเข้าสู่ระบบ) การเขียนใช้ optimistic revision และ nonce guard ใน atomic batch ป้องกันการเขียนทับเมื่อมีหลายผู้ใช้

API อ่าน snapshot ของตารางทั้งหมดต่อคำขอเพื่อใช้ validation เดิม เหมาะกับขนาดข้อมูลโรงเรียนในไฟล์นี้ หากจำนวนรายการโตมากควรเพิ่ม pagination และ query เฉพาะปีงบประมาณ จำกัด payload 5 MB ต่อคำขอ ให้แบ่งไฟล์นำเข้าที่ใหญ่กว่านั้น

อ้างอิง: [Pages configuration](https://developers.cloudflare.com/pages/functions/wrangler-configuration/), [D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/), [Node crypto](https://developers.cloudflare.com/workers/runtime-apis/nodejs/crypto/), [SheetJS package ทางการ](https://docs.sheetjs.com/docs/getting-started/installation/nodejs/)
"# budget" 
#   b u d g e t  
 