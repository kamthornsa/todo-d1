# Simple Todo

Todo ส่วนบุคคลบน Next.js, Cloudflare Workers, D1, Better Auth และ Drizzle ORM

## Local development

1. คัดลอก `.dev.vars.example` เป็น `.dev.vars` และสร้าง `BETTER_AUTH_SECRET` แบบสุ่มอย่างน้อย 32 ตัวอักษร
2. รัน `npm run db:migrate:local`
3. รัน `npm run dev`

ทดสอบ runtime แบบเดียวกับ Workers ด้วย `npm run preview`

## Production setup

1. เปลี่ยน `database_id` ใน `wrangler.jsonc` ให้เป็น Database ID ของ `todo-db`
2. ตั้ง Worker secrets:
   - `npx wrangler secret put BETTER_AUTH_SECRET`
   - `npx wrangler secret put BETTER_AUTH_URL` (เช่น `https://simple-todo.<subdomain>.workers.dev`)
3. Apply migration: `npm run db:migrate:remote`
4. Deploy: `npm run deploy`

## GitHub Actions secrets

เพิ่ม Repository secrets ต่อไปนี้:

- `CLOUDFLARE_API_TOKEN` — token ที่มี Workers Scripts: Edit และ D1: Edit
- `CLOUDFLARE_ACCOUNT_ID`

เมื่อ push เข้า `main` ระบบจะ apply D1 migrations และ deploy อัตโนมัติไป `workers.dev`

## Security

ทุก query ที่แก้ไขหรือลบ Todo ใช้ทั้ง `todo.id` และ `session.user.id` เพื่อป้องกันการเข้าถึงข้อมูลข้ามผู้ใช้
