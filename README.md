KMITL Marketplace 🛒
โครงงานรายวิชา Software Design and Development 2
เว็บแอปพลิเคชันสำหรับซื้อขายและส่งต่อสินค้าระหว่างนักศึกษาและบุคลากรของ สจล.

โปรเจกต์นี้เป็น ต้นแบบเพื่อการศึกษา (Academic Project) ไม่ใช่เว็บไซต์ทางการของสถาบัน โดยมีฟีเจอร์หลัก เช่น การเข้าสู่ระบบ การลงประกาศสินค้า การค้นหา/กรองสินค้า การอัปโหลดภาพ และส่วนที่เกี่ยวข้องกับการติดต่อซื้อขาย

เอกสารนี้เขียนสำหรับอาจารย์หรือผู้ทดลองที่ได้รับไฟล์ ZIP ของโครงงาน สามารถทำตามเพื่อเปิดเว็บไซต์บน Windows 10/11 ได้ โดยไม่จำเป็นต้องมีบัญชี Railway หรือ GitHub
1. โปรแกรมที่ต้องติดตั้ง
โปรแกรม	ใช้ทำอะไร	จำเป็นไหม
Python 3.12	รัน Backend (FastAPI)	จำเป็น
Node.js 22 LTS ขึ้นไป (มี npm)	รัน Frontend (Next.js)	จำเป็น
VS Code	เปิดโฟลเดอร์โครงงานและ Terminal	แนะนำ
Google Chrome / Microsoft Edge	เปิดหน้าเว็บไซต์และทดสอบ Animation	แนะนำ
Git	ดูประวัติ/ทำงานร่วมกันผ่าน GitHub	ไม่จำเป็นสำหรับ ZIP
Docker Desktop	ใช้สำหรับสภาพแวดล้อม Container หรือการสาธิต Deployment	ไม่จำเป็นสำหรับ Local Demo


เว็บไซต์ดาวน์โหลด: Python · Node.js · VS Code · Docker
ขณะติดตั้ง Python บน Windows ให้เปิดตัวเลือก Add Python to PATH ถ้ามี และหลังติดตั้งโปรแกรมให้ปิด/เปิด Terminal ใหม่

ตรวจสอบการติดตั้งด้วยคำสั่งใน PowerShell:
python --version
node --version
npm --version
การติดตั้งแพ็กเกจครั้งแรกต้องใช้อินเทอร์เน็ต เพื่อดาวน์โหลด Python packages และ npm packages แต่หลังเตรียมเครื่องแล้ว การสาธิตผ่าน localhost ไม่จำเป็นต้องพึ่ง Railway หรือบริการส่งอีเมลจริง
2. เตรียมโฟลเดอร์หลังแตก ZIP (ทำครั้งแรก)
1. แตกไฟล์ ZIP ของโครงงานออกมาเป็นโฟลเดอร์ปกติ ไม่รันจากในหน้าต่าง ZIP โดยตรง
2. เปิด VS Code แล้วเลือก File → Open Folder ไปยังโฟลเดอร์ที่มี backend, frontend และ docker-compose.yml
3. เปิด Terminal → New Terminal (แนะนำ PowerShell)
4. สร้างไฟล์ตั้งค่าจากตัวอย่าง โดยรันที่โฟลเดอร์หลักของโปรเจกต์:
Copy-Item .\backend\.env.example .\backend\.env
Copy-Item .\frontend\.env.example .\frontend\.env.local
สำคัญ: หาก ZIP ไม่มี backend/.env เป็นเรื่องปกติ เพราะไม่ควรแนบค่า Secret จากเครื่องผู้พัฒนาไปด้วย วิธีที่ถูกต้องคือคัดลอกจาก .env.example ตามขั้นตอนข้างบน

ใน backend/.env สำหรับการทดลองในเครื่อง ให้ตรวจว่ามีค่าประมาณนี้ (เป็นค่า Local Demo ไม่ใช่ Production):

ENV=local_demo
DATABASE_URL=sqlite:///./marketplace_demo.db
SECRET_KEY=local-demo-only-not-for-production-change-me-1234
FRONTEND_ORIGINS=http://localhost:3000
API_PUBLIC_URL=http://localhost:8000
SMTP_HOST=

ใน frontend/.env.local ให้มี:
NEXT_PUBLIC_API_URL=http://localhost:8000

อย่านำโหมด local_demo หรือค่า Secret ตัวอย่างไปเปิดบนเว็บไซต์สาธารณะ เพราะ OTP จำลองไม่ได้พิสูจน์ว่าเป็นเจ้าของอีเมลจริง
3. วิธีเปิดโปรแกรมแบบง่ายที่สุด (Windows)
ต้องเปิด 2 Terminal และปล่อยให้ทั้งสองหน้าต่างทำงานค้างไว้

Terminal 1 — เปิด Backend (เริ่มที่โฟลเดอร์หลัก):
powershell -ExecutionPolicy Bypass -File .\START_BACKEND_DEMO.ps1
สคริปต์จะติดตั้ง Python dependencies จาก backend/requirements.txt แล้วเปิด FastAPI ที่ http://127.0.0.1:8000

Terminal 2 — เปิด Frontend (เปิด Terminal ใหม่ที่โฟลเดอร์หลัก):
powershell -ExecutionPolicy Bypass -File .\START_FRONTEND_DEMO.ps1
สคริปต์จะติดตั้ง npm packages หากยังไม่มี แล้วเปิด Next.js ที่ http://localhost:3000

จากนั้นเปิดใน Browser:
ลิงก์	ใช้ดูอะไร
http://localhost:3000	หน้าเว็บไซต์และ UI/Animation
http://localhost:3000/login	หน้าเข้าสู่ระบบ
http://localhost:8000/health	เช็ก Backend; ควรเห็น {"status":"ok"}
http://localhost:8000/docs	หน้าทดลอง API (Swagger UI)


ถ้าไม่มีไฟล์ START_BACKEND_DEMO.ps1 หรือ START_FRONTEND_DEMO.ps1 ใน ZIP ให้ใช้วิธีเปิดเองในข้อ 4 แทน

4. ถ้าต้องการเปิดเองโดยไม่ใช้สคริปต์
วิธีนี้เหมาะเมื่อสคริปต์เปิดไม่ได้หรืออยากเห็นขั้นตอนชัด ๆ

Terminal 1 — Backend (เริ่มที่โฟลเดอร์หลัก):
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
Terminal 2 — Frontend (เปิด Terminal ใหม่ที่โฟลเดอร์หลัก):
cd frontend
npm install
npm run dev
เมื่อเปิดสำเร็จ ให้เข้า http://localhost:3000 จาก Browser
ถ้าเคยติดตั้งแพ็กเกจแล้ว การเปิดครั้งต่อไปไม่ต้องรัน pip install และ npm install ใหม่ทุกครั้ง

5. วิธีเปิดดู UI และ Animation ✨
ไม่ต้องติดตั้ง Animation แยก เพราะ Frontend ใช้ React, Tailwind CSS, Framer Motion และ Canvas ที่รวมอยู่ในโค้ด/แพ็กเกจของโปรเจกต์แล้ว
1. เปิด Backend และ Frontend ตามข้อ 3 หรือ 4 ก่อน
2. เปิด http://localhost:3000 จะเห็นหน้า Home พร้อมส่วน Hero และข้อความ “Good Things, New Stories.” (ข้อความอาจต่างเล็กน้อยตามเวอร์ชันโค้ด)
3. ลอง เลื่อนเมาส์บริเวณ Hero เพื่อดูอนุภาคและเส้นแสงตอบสนองต่อเมาส์
4. ลอง สลับโหมด Dark / Light ที่ปุ่มสลับธีมบนแถบเมนูด้านบน เพื่อดูเอฟเฟกต์ Liquid Glass
5. เลื่อนลง ไปยังส่วนค้นหาและตัวกรองสินค้า ทดลองคลิกตัวเลือกหมวดหมู่/สภาพสินค้า
6. เลื่อนลงไปส่วน FAQ แล้วคลิกเปิด–ปิดคำถาม เพื่อดู Animation ของ Accordion
ไฟล์ส่วน UI ที่เกี่ยวข้อง (สำหรับผู้ต้องการดู Source Code):
- frontend/components/ui/aether-flow-hero.tsx — อนุภาค/เส้นแสงและ Animation หน้าแรก
- frontend/components/ui/liquid-glass-toggle.tsx — สวิตช์และเอฟเฟกต์ Liquid Glass
- frontend/components/theme-toggle.tsx และ theme-provider.tsx — ระบบเปลี่ยนธีม
- frontend/components/ui/glass-select.tsx — ตัวกรองแบบ Glass UI
- frontend/components/ui/liquid-glass-accordion.tsx และ marketplace-faq.tsx — FAQ แบบยุบ/ขยาย
- frontend/app/globals.css — สไตล์ สี และเอฟเฟกต์โดยรวม
หมายเหตุเรื่อง Animation: บางระบบอาจตั้งค่า Reduce Motion เพื่อลดการเคลื่อนไหว ซึ่งหน้าเว็บจะเคารพค่านี้และแสดง Animation น้อยลงหรือเป็นภาพนิ่งตามการออกแบบ ไม่ใช่ข้อผิดพลาดของระบบ

ที่มาของ UI: งานบางส่วนใช้แนวคิด/Component จาก 21st.dev เป็นตัวอย่างตั้งต้น แล้วปรับรูปแบบ สี ข้อความ และการเชื่อมต่อให้เข้ากับ KMITL Marketplace ควรอ้างอิง Component ต้นฉบับและตรวจเงื่อนไข License ของแต่ละรายการก่อนนำไปใช้เผยแพร่จริง
6. วิธีทดลองฟีเจอร์หลักแบบ Local Demo
1. เข้า http://localhost:3000/login
2. ใส่อีเมลตัวอย่าง เช่น demo@kmitl.ac.th แล้วกดขอ OTP
3. ในโหมด Local Demo จะมี OTP จำลอง 6 หลัก แสดงบนหน้าเว็บ ไม่ต้องรออีเมลจริง
4. นำรหัสนั้นมากรอกเพื่อยืนยัน แล้วเข้าสู่หน้า ลงขายสินค้า
5. กรอกชื่อสินค้า ราคา รายละเอียด เพิ่มรูปภาพ และบันทึกประกาศ
6. กลับไปหน้าแรก ลองค้นหาสินค้า หรือเปิดหน้ารายละเอียดของสินค้าที่เพิ่งลงขาย
หากต้องการสาธิต Error Handling สามารถลองกรอก OTP ผิด หรือขอ OTP ซ้ำเร็วเกินไปได้ ระบบจะตอบกลับข้อความแจ้งข้อผิดพลาดตามเงื่อนไขที่กำหนด
โหมดนี้จำกัดการใช้ OTP จำลองไว้กับเครื่องที่รัน Backend เอง ไม่เหมาะสำหรับนำขึ้น Hosting สาธารณะ

7. ปิดโปรแกรมและแก้ปัญหาเบื้องต้น
- ปิดโปรแกรม: กลับไปยัง Terminal ทั้งสองหน้าต่างแล้วกด Ctrl + C
- เปิดเว็บไม่ขึ้น: ตรวจว่า Backend และ Frontend ยังรันอยู่ และเปิด http://localhost:3000 ไม่ใช่ลิงก์ Railway
- Backend แจ้ง Missing backend/.env: ทำขั้นตอนคัดลอก .env.example ในข้อ 2
- python หรือ npm ไม่พบคำสั่ง: ตรวจว่าติดตั้ง Python และ Node.js แล้ว จากนั้นเปิด Terminal ใหม่
- Port 3000 หรือ 8000 ถูกใช้: ปิดโปรแกรมที่เปิดพอร์ตเดิมก่อน แล้วจึงรันอีกครั้ง
- OTP ไม่ขึ้น: ตรวจว่า ENV=local_demo, DATABASE_URL ใช้ SQLite, SMTP_HOST ว่าง และเรียกผ่าน localhost เท่านั้น
- หน้าเว็บขึ้นแต่รายการสินค้าไม่โหลด: เปิด http://localhost:8000/health เพื่อตรวจ Backend และดู Error ใน Terminal
- Animation ไม่เคลื่อนไหว: ลองรีเฟรชหน้าเว็บ ตรวจการตั้งค่า Reduce Motion และทดสอบบน Chrome/Edge รุ่นปัจจุบัน
8. โครงสร้างโฟลเดอร์โดยย่อ
KMITL_Marketplace_Team/
├── backend/                 Python / FastAPI / SQLAlchemy / Tests
│   ├── app/
│   ├── requirements.txt
│   └── .env.example
├── frontend/                Next.js / React / TypeScript / UI Animation
│   ├── app/
│   ├── components/
│   ├── package.json
│   └── .env.example
├── .github/workflows/       GitHub Actions (CI)
├── docs/                    เอกสารการออกแบบและความปลอดภัย (ถ้ามี)
├── docker-compose.yml      Container setup
├── START_BACKEND_DEMO.ps1   เปิด Backend สำหรับ Local Demo
├── START_FRONTEND_DEMO.ps1  เปิด Frontend สำหรับ Local Demo
└── README.md                คู่มือฉบับนี้
