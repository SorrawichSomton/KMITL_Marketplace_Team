# KMITL Marketplace — Team of 5 starter repository

**นี่คือโครงสร้างเริ่มต้นเท่านั้น ไม่ใช่ระบบ Marketplace ที่มี Feature ใช้งานครบ** โปรเจกต์นี้เป็น Repo ใหม่ แยกจากโปรเจกต์ Railway และ Local Demo เดิม เพื่อให้อาจารย์เห็น Git history ของสมาชิกแต่ละคนจากการพัฒนาจริง

- Frontend: Next.js App Router / TypeScript / Tailwind CSS
- Backend: FastAPI / Python (SQLite สำหรับรันเริ่มต้นในเครื่อง; PostgreSQL จะเป็นงานของเจ้าของ repo ก่อนใช้จริง)
- การแบ่งไฟล์: ดู `docs/01_OWNERSHIP.md`, `docs/02_GITHUB_WORKFLOW_TH.md`
- การติดตั้งเครื่องเพื่อน: ดู `docs/03_SETUP_WINDOWS_TH.md`
- จุดเชื่อม API ก่อนทำ Feature: ดู `docs/04_API_CONTRACTS.md`
- การส่งงานอาจารย์: ดู `docs/05_GIT_EVIDENCE.md`

## Quick start (Windows PowerShell)

เปิด 2 terminals ที่ root ของ repo แล้วใช้:

```powershell
.\scripts\START_BACKEND.ps1
.\scripts\START_FRONTEND.ps1
```

Backend http://127.0.0.1:8000/health ; Frontend http://localhost:3000

สคริปต์จะสร้าง local `.env` จาก `.env.example` เฉพาะเครื่องของแต่ละคน ไม่ส่ง secret ขึ้น GitHub

> ไม่มี OTP จำลอง, Login จริง, ลงขาย, แชต หรือการเชื่อม Railway ใน repo ใหม่นี้ สมาชิกต้องพัฒนาเองตามขอบเขตที่แบ่งไว้
