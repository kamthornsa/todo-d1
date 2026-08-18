# Product Requirements Document (PRD)
# Simple Todo – Cloudflare Workers + D1

**Version:** 1.0  
**Status:** MVP Planning  
**Target Platform:** Web Application  
**Architecture:** Serverless / Cloudflare-native  
**Primary Stack:** Next.js + TypeScript + Cloudflare Workers + D1 + Better Auth + Drizzle ORM

---

## 1. Product Overview

### 1.1 Product Name
**Simple Todo**

ชื่อชั่วคราวสำหรับระบบทดลองพัฒนา Full-stack Web Application บน Cloudflare โดยใช้ Cloudflare Workers เป็น Runtime และ Cloudflare D1 เป็นฐานข้อมูลหลัก

### 1.2 Product Concept

Simple Todo เป็นระบบจัดการรายการงานส่วนบุคคลแบบง่าย ผู้ใช้สามารถสมัครสมาชิก เข้าสู่ระบบ และจัดการรายการ Todo ของตนเองได้

ระบบนี้มีเป้าหมายหลักเพื่อเป็นต้นแบบสำหรับการเรียนรู้และทดสอบการพัฒนา Web Application แบบ Serverless โดยไม่ต้องดูแล VPS หรือ Database Server เอง

ระบบ MVP จะรองรับ:

- สมัครสมาชิก
- Login / Logout
- Session Authentication
- เพิ่ม Todo
- ดูรายการ Todo
- แก้ไข Todo
- ทำเครื่องหมายว่าเสร็จแล้ว
- ลบ Todo
- แยกข้อมูลตามผู้ใช้
- Deploy บน Cloudflare Workers
- ใช้ Cloudflare D1 เป็นฐานข้อมูล

---

# 2. Product Goals

## 2.1 Primary Goals

1. สร้าง Full-stack Web Application ที่ทำงานจริงบน Cloudflare Workers
2. ทดลองใช้ Cloudflare D1 เป็น SQL Database
3. มีระบบ Authentication ที่ใช้งานได้จริง
4. ผู้ใช้แต่ละคนเห็นเฉพาะ Todo ของตนเอง
5. รองรับ CRUD ครบถ้วน
6. สามารถ Deploy ด้วย Free Tier ได้ในช่วงทดลอง
7. โครงสร้างโปรเจกต์ต้องสามารถขยายต่อในอนาคตได้

---

## 2.2 Learning Goals

โปรเจกต์นี้ควรช่วยให้ผู้พัฒนาเข้าใจเรื่อง:

- Next.js App Router
- Server Components
- Client Components
- Server Actions หรือ Route Handlers
- Authentication
- Session Management
- Database Binding
- Cloudflare D1
- Drizzle ORM
- Database Migration
- Cloudflare Workers
- Environment Variables
- Deployment Workflow

---

# 3. Non-Goals

MVP รุ่นแรกจะ **ยังไม่ทำ** ฟังก์ชันต่อไปนี้:

- Social Login เช่น Google, Facebook, LINE
- Email Verification
- Forgot Password
- File Upload
- Image Upload
- R2 Storage
- Push Notification
- Email Notification
- Team Todo
- Shared Todo
- Real-time Collaboration
- Admin Dashboard
- Mobile Application
- Offline Mode
- Calendar Integration
- Recurring Todo
- AI Integration
- PostgreSQL
- Prisma
- Docker
- VPS

ฟังก์ชันเหล่านี้สามารถเพิ่มใน Phase ต่อไปได้

---

# 4. Target Users

## 4.1 Primary User

ผู้ใช้งานทั่วไปที่ต้องการ:

- จดรายการสิ่งที่ต้องทำ
- บันทึกงานส่วนตัว
- ติดตามว่างานใดเสร็จหรือยัง
- เข้าถึงรายการ Todo ผ่านเว็บ

## 4.2 Secondary User

นักพัฒนา / นักศึกษา / ผู้เรียนที่ต้องการศึกษาการสร้าง Full-stack Application ด้วย Cloudflare

---

# 5. User Roles

MVP มีเพียง 1 Role

## User

สามารถ:

- Register
- Login
- Logout
- ดู Todo ของตนเอง
- เพิ่ม Todo
- แก้ไข Todo
- เปลี่ยนสถานะ Todo
- ลบ Todo

ยังไม่มี Admin ใน MVP

---

# 6. User Journey

## 6.1 New User

```text
Landing Page
    ↓
Register
    ↓
Create Account
    ↓
Login / Auto Login
    ↓
Todo Dashboard
    ↓
Create Todo
```

---

## 6.2 Returning User

```text
Landing Page
    ↓
Login
    ↓
Todo Dashboard
    ↓
Manage Todos
```

---

## 6.3 Unauthorized User

หากผู้ใช้ยังไม่ได้ Login แล้วเข้า:

```text
/todos
```

ระบบต้อง Redirect ไป:

```text
/login
```

---

# 7. Functional Requirements

# FR-01: User Registration

ผู้ใช้ต้องสามารถสร้างบัญชีได้

### Input

- Name
- Email
- Password

### Validation

Name:

- Required
- ความยาว 2–100 ตัวอักษร

Email:

- Required
- ต้องเป็นรูปแบบ Email ที่ถูกต้อง
- Email ต้องไม่ซ้ำในระบบ

Password:

- Required
- อย่างน้อย 8 ตัวอักษร

### Expected Result

เมื่อสมัครสำเร็จ:

- สร้าง User ในฐานข้อมูล
- Password ต้องไม่ถูกเก็บเป็น Plain Text
- สามารถ Login ได้

---

# FR-02: User Login

ผู้ใช้สามารถ Login ด้วย:

- Email
- Password

### Login Success

Redirect ไป:

```text
/todos
```

### Login Failed

แสดงข้อความ:

```text
Email หรือ Password ไม่ถูกต้อง
```

ไม่ควรบอกว่า Email มีอยู่หรือไม่มีอยู่ในระบบ

---

# FR-03: User Logout

ผู้ใช้สามารถ Logout ได้

เมื่อ Logout:

- Session ต้องถูกยกเลิก
- Redirect ไป `/login`

---

# FR-04: Session Authentication

ระบบต้องมี Session Authentication

เมื่อ Login สำเร็จ:

```text
User
  ↓
Session
  ↓
Secure Cookie
```

Session ต้องสามารถใช้ระบุ User ปัจจุบันได้

---

# FR-05: Protected Routes

Routes ที่ต้อง Login:

```text
/todos
/todos/*
```

หากไม่มี Session:

```text
Redirect → /login
```

---

# FR-06: Create Todo

ผู้ใช้สามารถเพิ่ม Todo ใหม่ได้

### Input

- Title

### Required

Title:

- Required
- ความยาว 1–255 ตัวอักษร

### Default

เมื่อสร้าง Todo:

```text
completed = false
```

Todo ต้องถูกผูกกับ:

```text
currentUser.id
```

---

# FR-07: View Todo List

หน้า `/todos` ต้องแสดง Todo เฉพาะของผู้ใช้ที่ Login อยู่

ตัวอย่าง:

```text
☐ อ่าน Paper
☐ เตรียมเอกสารประชุม
☑ ตรวจงานนักศึกษา
```

ห้าม Query Todo ของ User คนอื่น

---

# FR-08: Complete Todo

ผู้ใช้สามารถเปลี่ยนสถานะ Todo:

```text
Pending
    ↕
Completed
```

Database Field:

```text
completed
```

---

# FR-09: Edit Todo

ผู้ใช้สามารถแก้ไข Title ของ Todo ได้

ก่อน Update ระบบต้องตรวจสอบว่า:

```text
todo.userId === currentUser.id
```

---

# FR-10: Delete Todo

ผู้ใช้สามารถลบ Todo ของตนเองได้

ก่อน Delete ระบบต้องตรวจสอบ Ownership

---

# FR-11: Todo Ownership

ทุก Database Operation ต้องตรวจสอบ User Ownership

ห้ามใช้เพียง:

```sql
SELECT * FROM todos WHERE id = ?
```

ควรใช้:

```sql
SELECT *
FROM todos
WHERE id = ?
AND user_id = ?
```

แนวคิดเดียวกันต้องใช้กับ:

- UPDATE
- DELETE

---

# 8. UI Requirements

## 8.1 Design Direction

UI เน้น:

- Minimal
- Clean
- Responsive
- ใช้งานง่าย
- Mobile Friendly

ไม่ต้องมี UI ซับซ้อน

---

## 8.2 Pages

### `/`

Landing Page

ประกอบด้วย:

- Logo / App Name
- คำอธิบายสั้น
- Login
- Register

---

### `/register`

Form:

```text
Name
Email
Password

[Create Account]
```

Link:

```text
Already have an account? Login
```

---

### `/login`

Form:

```text
Email
Password

[Login]
```

Link:

```text
Don't have an account? Register
```

---

### `/todos`

Layout ตัวอย่าง:

```text
Simple Todo

Hello, User Name

----------------------------------

Add new todo...

[ Add Todo ]

----------------------------------

☐ อ่าน Paper
☑ ตรวจงานนักศึกษา
☐ เตรียมประชุม

----------------------------------

[Logout]
```

---

# 9. Technical Architecture

```text
                    Internet
                       │
                       ▼
               Cloudflare Network
                       │
                       ▼
              Cloudflare Workers
                       │
                    Next.js
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
     Better Auth               Todo Logic
          │                         │
          └────────────┬────────────┘
                       │
                       ▼
                  Drizzle ORM
                       │
                       ▼
                 Cloudflare D1
```

---

# 10. Technology Stack

## Frontend

```text
Next.js
React
TypeScript
Tailwind CSS
```

## Backend

```text
Next.js Server Components
Server Actions / Route Handlers
Cloudflare Workers
```

## Authentication

```text
Better Auth
```

## ORM

```text
Drizzle ORM
```

## Database

```text
Cloudflare D1
SQLite-compatible SQL
```

## Deployment

```text
Cloudflare Workers
```

## Source Control

```text
Git
GitHub
```

---

# 11. Proposed Project Structure

```text
todo-d1/
│
├── app/
│   ├── page.tsx
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── register/
│   │   └── page.tsx
│   │
│   ├── todos/
│   │   ├── page.tsx
│   │   └── actions.ts
│   │
│   └── api/
│       └── auth/
│
├── components/
│   ├── todo-form.tsx
│   ├── todo-item.tsx
│   ├── todo-list.tsx
│   └── logout-button.tsx
│
├── db/
│   ├── index.ts
│   └── schema.ts
│
├── lib/
│   ├── auth.ts
│   ├── auth-client.ts
│   └── session.ts
│
├── drizzle/
│   └── migrations/
│
├── public/
│
├── middleware.ts
│
├── drizzle.config.ts
├── wrangler.jsonc
├── package.json
└── README.md
```

หมายเหตุ:

โครงสร้างจริงสามารถปรับตามวิธี Integration ของ Next.js + Better Auth + Cloudflare Workers เวอร์ชันที่ใช้งาน ณ เวลาพัฒนา

---

# 12. Database Design

Better Auth อาจสร้างตาราง Authentication เพิ่มเติมตาม Adapter ที่เลือก

Logical Model เบื้องต้น:

```text
USER
 ├── ACCOUNT
 ├── SESSION
 └── TODO
```

---

## 12.1 User

ตัวอย่าง Logical Fields:

```text
id
name
email
emailVerified
image
createdAt
updatedAt
```

---

## 12.2 Session

ตัวอย่าง:

```text
id
userId
token
expiresAt
createdAt
updatedAt
```

---

## 12.3 Account

ใช้สำหรับ Authentication Provider / Credentials

ตัวอย่าง:

```text
id
userId
providerId
accountId
password
createdAt
updatedAt
```

รายละเอียดจริงให้ยึด Schema ที่ Better Auth Adapter สร้าง

---

## 12.4 Todos

Recommended Schema:

```sql
CREATE TABLE todos (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
```

เพิ่ม Index:

```sql
CREATE INDEX idx_todos_user_id
ON todos(user_id);
```

อาจเพิ่ม:

```sql
CREATE INDEX idx_todos_user_completed
ON todos(user_id, completed);
```

---

# 13. Data Relationship

```text
users
-----------------------------------
id
name
email


todos
-----------------------------------
id
user_id
title
completed
created_at
updated_at
```

Relationship:

```text
users.id
   │
   │ 1:N
   ▼
todos.user_id
```

---

# 14. Todo Business Rules

## BR-01

Todo ต้องมีเจ้าของเสมอ

```text
user_id NOT NULL
```

## BR-02

ผู้ใช้แก้ไขได้เฉพาะ Todo ของตนเอง

## BR-03

ผู้ใช้ลบได้เฉพาะ Todo ของตนเอง

## BR-04

Todo ใหม่มีสถานะ:

```text
completed = false
```

## BR-05

Todo Title ห้ามเป็นค่าว่าง

---

# 15. Authentication Rules

## AUTH-01

Password ห้ามเก็บเป็น Plain Text

## AUTH-02

Session Cookie ควรตั้งค่าเหมาะสม เช่น:

```text
HttpOnly
Secure
SameSite
```

ตาม Environment และ Auth Library

## AUTH-03

Authentication ต้องตรวจสอบบน Server

ห้ามใช้เพียง Client-side state เพื่อบอกว่า Login แล้ว

## AUTH-04

Server Action / API ที่เกี่ยวกับ Todo ต้องตรวจ Session ทุกครั้ง

---

# 16. Security Requirements

## 16.1 Authorization

สิ่งสำคัญที่สุดคือ:

```text
Authentication ≠ Authorization
```

Login แล้วไม่ได้หมายความว่าสามารถเข้าถึง Todo ทุกตัวได้

ทุก Update/Delete ต้องตรวจ:

```text
todo.userId === session.user.id
```

---

## 16.2 SQL Injection

ใช้:

- Drizzle ORM
- Parameterized Queries

ห้ามประกอบ SQL จาก User Input โดยตรง

---

## 16.3 Password Security

ให้ Better Auth หรือ Library ที่เชื่อถือได้จัดการ Password Hash

ห้ามเขียน Algorithm เก็บ Password เองถ้าไม่จำเป็น

---

## 16.4 Input Validation

ควร Validate:

- Email
- Password
- Todo Title
- URL Parameters
- IDs

สามารถใช้ Library เช่น:

```text
Zod
```

---

## 16.5 Error Handling

Production Error ไม่ควรแสดง:

- Stack Trace
- Database Credentials
- Internal SQL
- Secret
- Environment Variables

---

# 17. Environment Configuration

ตัวอย่างค่าที่อาจต้องมี:

```env
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
```

Production:

```env
BETTER_AUTH_URL=https://todo-app.example.workers.dev
```

Secret ห้าม Commit เข้า Git

---

# 18. Cloudflare Configuration

ต้องมี D1 Binding

ตัวอย่าง conceptual configuration:

```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "todo-db",
      "database_id": "YOUR_DATABASE_ID"
    }
  ]
}
```

Application ต้องสามารถเรียก D1 ผ่าน Binding:

```text
DB
```

---

# 19. Local Development

Recommended Workflow:

```text
Developer Computer
      │
      ▼
Next.js Development
      │
      ▼
Local D1
```

Production:

```text
Cloudflare Worker
      │
      ▼
Remote D1
```

Local และ Production Database ต้องแยกกัน

---

# 20. Development Workflow

```text
1. Create Project
      ↓
2. Configure Cloudflare
      ↓
3. Create D1
      ↓
4. Configure Drizzle
      ↓
5. Create Database Schema
      ↓
6. Add Better Auth
      ↓
7. Implement Register
      ↓
8. Implement Login
      ↓
9. Implement Protected Route
      ↓
10. Implement Todo CRUD
      ↓
11. Test Authorization
      ↓
12. Deploy
```

---

# 21. MVP Development Phases

## Phase 1 – Project Setup

Tasks:

- Create Next.js Project
- Configure TypeScript
- Configure Tailwind
- Configure Cloudflare Workers
- Create D1 Database
- Configure D1 Binding
- Install Drizzle ORM
- Configure migrations

Deliverable:

```text
Next.js สามารถอ่าน/เขียน D1 ได้
```

---

## Phase 2 – Authentication

Tasks:

- Install Better Auth
- Configure Auth Database
- Generate Auth Tables
- Register Page
- Login Page
- Logout
- Session
- Protected Route

Deliverable:

```text
User สามารถ Register/Login/Logout ได้
```

---

## Phase 3 – Todo CRUD

Tasks:

- Create Todo Table
- Add Todo
- List Todos
- Complete Todo
- Edit Todo
- Delete Todo

Deliverable:

```text
CRUD Todo ใช้งานได้ครบ
```

---

## Phase 4 – Authorization

Test:

```text
User A
   ↓
ต้องไม่สามารถอ่าน
แก้ไข
หรือลบ Todo ของ User B ได้
```

Deliverable:

```text
Data Isolation ถูกต้อง
```

---

## Phase 5 – UI

Tasks:

- Responsive Layout
- Loading State
- Empty State
- Error Message
- Form Validation

---

## Phase 6 – Deployment

Tasks:

- Production Environment Variables
- D1 Production Migration
- Worker Deployment
- Production Testing

Deliverable:

```text
Public URL
```

---

# 22. Acceptance Criteria

ระบบ MVP ถือว่าสำเร็จเมื่อผ่านทุกข้อดังนี้

## Authentication

- [ ] ผู้ใช้สมัครสมาชิกได้
- [ ] Email ซ้ำสมัครไม่ได้
- [ ] Password ถูกจัดเก็บอย่างปลอดภัย
- [ ] ผู้ใช้ Login ได้
- [ ] Login ผิดแสดง Error
- [ ] Logout ได้
- [ ] Session ทำงาน
- [ ] Route `/todos` ต้อง Login

## Todo

- [ ] เพิ่ม Todo ได้
- [ ] แสดง Todo ได้
- [ ] แก้ไข Todo ได้
- [ ] Mark Complete ได้
- [ ] Mark Pending ได้
- [ ] ลบ Todo ได้

## Authorization

- [ ] User A ไม่เห็น Todo ของ User B
- [ ] User A แก้ไข Todo ของ User B ไม่ได้
- [ ] User A ลบ Todo ของ User B ไม่ได้

## Deployment

- [ ] Application Deploy บน Cloudflare Workers ได้
- [ ] Production ใช้ Cloudflare D1
- [ ] Register ทำงานบน Production
- [ ] Login ทำงานบน Production
- [ ] Todo CRUD ทำงานบน Production

---

# 23. Testing Scenarios

## Test 1 – Registration

```text
Register:
alice@example.com
```

Expected:

```text
Account Created
```

---

## Test 2 – Duplicate Email

Register:

```text
alice@example.com
```

อีกครั้ง

Expected:

```text
Registration Failed
Email already exists
```

---

## Test 3 – Login

Correct Password:

```text
Success
```

Incorrect Password:

```text
Failed
```

---

## Test 4 – Todo Isolation

Alice creates:

```text
Alice Todo
```

Bob Login

Expected:

```text
Bob must NOT see Alice Todo
```

---

## Test 5 – Unauthorized URL Access

Logout

Open:

```text
/todos
```

Expected:

```text
Redirect → /login
```

---

# 24. Error States

ระบบควรรองรับ:

```text
Network Error
Database Error
Invalid Session
Expired Session
Invalid Form
Duplicate Email
Todo Not Found
Unauthorized Todo Access
```

---

# 25. Empty States

เมื่อยังไม่มี Todo:

```text
ยังไม่มีรายการ Todo

เริ่มต้นด้วยการเพิ่มงานแรกของคุณ
```

---

# 26. Performance Requirements

MVP ไม่ต้อง Optimization ขั้นสูง

แต่ควร:

- Query Todo เฉพาะ Current User
- ใช้ Database Index ที่ `user_id`
- ไม่ Query ทุก Todo แล้ว Filter ใน Application
- ลด Client-side JavaScript ที่ไม่จำเป็น
- ใช้ Server Components เมื่อเหมาะสม

---

# 27. Logging

MVP ควร Log เฉพาะ Error ที่จำเป็น

ตัวอย่าง:

```text
Authentication Error
Database Error
Unexpected Server Error
```

ห้าม Log:

```text
Password
Session Token
Auth Secret
Sensitive Cookies
```

---

# 28. Deployment Strategy

MVP:

```text
GitHub
   │
   ▼
Cloudflare Deployment
   │
   ▼
Cloudflare Workers
   │
   ▼
D1
```

หรือ Deploy ผ่าน Wrangler CLI ได้

---

# 29. Git Strategy

สำหรับโปรเจกต์ทดลอง ใช้แบบง่าย:

```text
main
```

เมื่อต้องการพัฒนาฟีเจอร์:

```text
feature/auth
feature/todo-crud
feature/ui
```

Merge เข้า:

```text
main
```

---

# 30. Suggested GitHub Repository

ชื่อ Repository:

```text
simple-todo-cloudflare
```

README ควรอธิบาย:

- Project Overview
- Stack
- Installation
- Environment Variables
- D1 Setup
- Migration
- Local Development
- Deployment

---

# 31. Definition of Done

Feature ใดถือว่า Done เมื่อ:

1. ทำงานตาม Requirement
2. Validate Input
3. ตรวจ Authentication
4. ตรวจ Authorization
5. ไม่มี TypeScript Error
6. ไม่มี Critical Runtime Error
7. ทดสอบ Local แล้ว
8. ทดสอบ Production แล้ว
9. Code Commit เข้า Git

---

# 32. Future Roadmap

## Version 1.1

เพิ่ม:

- Due Date
- Priority
- Search
- Filter
- Sort

Todo:

```text
Title
Due Date
Priority
Completed
```

---

## Version 1.2

เพิ่ม:

- Category
- Tags

ตัวอย่าง:

```text
Work
Research
Personal
Teaching
```

---

## Version 1.3

เพิ่ม:

- Forgot Password
- Email Verification

---

## Version 1.4

เพิ่ม Social Login:

```text
Google
GitHub
```

---

## Version 2.0

เพิ่ม:

- Shared Todo
- Team Workspace
- Role Management

---

## Version 2.1

เพิ่ม:

- Attachment
- Cloudflare R2

Architecture:

```text
Worker
 ├── D1
 └── R2
```

---

## Version 3.0

หากระบบโตมาก อาจพิจารณา:

```text
PostgreSQL
```

เช่น:

```text
Cloudflare Workers
      │
      ▼
Hyperdrive
      │
      ▼
PostgreSQL
```

ไม่จำเป็นต้องเปลี่ยนฐานข้อมูลจนกว่าจะมี Requirement จริง

---

# 33. Recommended MVP Scope

เพื่อไม่ให้โปรเจกต์แรกใหญ่เกินไป ให้ล็อก Scope ไว้ที่:

```text
AUTH
├── Register
├── Login
├── Logout
└── Session

TODO
├── Create
├── Read
├── Update
├── Complete
└── Delete

SECURITY
├── Protected Routes
└── User Data Isolation

INFRASTRUCTURE
├── Cloudflare Workers
└── Cloudflare D1
```

**ไม่เพิ่ม Feature อื่นจนกว่า MVP ชุดนี้จะทำงานครบ**

---

# 34. Development Priority

ลำดับความสำคัญ:

```text
P0
Authentication
Session
D1
Todo CRUD
Authorization

P1
Validation
UI
Responsive
Error Handling

P2
Search
Filter
Priority
Due Date

P3
File Upload
Social Login
Notification
Team
AI
```

---

# 35. AI Coding Agent Instruction

หากนำ PRD นี้ไปใช้กับ AI Coding Agent ให้กำหนดหลักการดังนี้:

```text
Build the application incrementally.

Do not implement future roadmap features.

Follow the MVP scope only.

Primary stack:
- Next.js
- TypeScript
- Tailwind CSS
- Cloudflare Workers
- Cloudflare D1
- Drizzle ORM
- Better Auth

Requirements:
- Use server-side authentication.
- Every todo must belong to a user.
- Never expose todos across users.
- Validate all server-side mutations.
- Use D1 bindings instead of external databases.
- Do not introduce PostgreSQL, Prisma, Docker, VPS, R2,
  Redis, Supabase, Firebase, or external authentication
  services unless explicitly requested.

Before implementing a feature:
1. Explain files that will be created or modified.
2. Implement the smallest working version.
3. Provide migration commands if database schema changes.
4. Provide local test steps.
5. Provide deployment test steps.
```

---

# 36. Final MVP Architecture

```text
                  User Browser
                       │
                       ▼
                Cloudflare Edge
                       │
                       ▼
              Next.js Application
                       │
                 Cloudflare Worker
                       │
           ┌───────────┴───────────┐
           │                       │
           ▼                       ▼
     Better Auth               Todo Service
           │                       │
           └───────────┬───────────┘
                       │
                       ▼
                  Drizzle ORM
                       │
                       ▼
                 Cloudflare D1
```

---

# 37. MVP Success Definition

โครงการ Simple Todo MVP ถือว่าประสบความสำเร็จเมื่อผู้ใช้สามารถ:

```text
สมัครสมาชิก
     ↓
Login
     ↓
สร้าง Todo
     ↓
แก้ไข Todo
     ↓
Complete Todo
     ↓
ลบ Todo
     ↓
Logout
```

และ User คนอื่นไม่สามารถเข้าถึงข้อมูล Todo ของกันและกันได้

โดย Application ทั้งหมดทำงานบน:

```text
Cloudflare Workers
+
Cloudflare D1
```

โดยไม่ต้องใช้ VPS หรือ Database Server ของตนเอง
