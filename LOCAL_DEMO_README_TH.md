# KMITL Marketplace — Local Demo พร้อมใช้งาน

โปรเจกต์นี้ทำไว้สาธิตบนเครื่องของตัวเอง **ห้าม Deploy ขึ้น Railway / Public server** เพราะ OTP จำลองใช้พิสูจน์ตัวตนจริงไม่ได้

## เปิดครั้งแรกบน Windows
1. ติดตั้ง **Python 3.11+** และ **Node.js 22+** ให้เรียก `python`, `npm` ใน PowerShell ได้
2. แตก ZIP และเปิดโฟลเดอร์ `KMITL_Marketplace_Local_Demo_Ready` ใน VS Code
3. เปิด Terminal #1 ที่ root โฟลเดอร์ แล้วรัน:
   `powershell -ExecutionPolicy Bypass -File .\START_BACKEND_DEMO.ps1`
4. เปิด Terminal #2 ที่ root โฟลเดอร์ แล้วรัน:
   `powershell -ExecutionPolicy Bypass -File .\START_FRONTEND_DEMO.ps1`
5. เปิด `http://localhost:3000/login` แล้วใส่ `demo@kmitl.ac.th`; OTP จำลองจะแสดงบนหน้าเว็บ
6. ใส่ OTP → เข้าสู่ระบบ → หน้า `/sell` → เพิ่มสินค้า

**ต้องเปิด Terminal ทั้งสองค้างไว้** และใช้งานผ่าน localhost เท่านั้น

## การตรวจสอบ
- Backend: `http://localhost:8000/health` ต้องตอบ `{ "status": "ok" }`
- Frontend: `http://localhost:3000/`
- ถ้ามีโปรแกรมใช้พอร์ต 3000/8000 อยู่แล้ว ต้องปิดโปรแกรมเก่าก่อน
- `npm run lint` และ `npm run build` จากโฟลเดอร์ frontend
- `python -m pytest -q` จากโฟลเดอร์ backend

## การปรับแก้
- ปิด Next.js Dev Tools indicator ใน `frontend/next.config.ts`
- ThemeToggle ป้องกัน Hydration Error จาก SSR/Client theme mismatch
- Liquid Toggle จำกัด drawing อยู่ภายในกรอบ รวม Liquid Glass effect
- แก้สคริปต์เปิด Frontend ที่เคยส่ง `127.0.0.1 3000` เป็น positional arguments
- ลบ `Academic Software Engineering Project` จาก footer

หมายเหตุ: การติดตั้ง package ครั้งแรกต้องเชื่อมอินเทอร์เน็ตเพื่อดาวน์โหลด dependencies ถ้ายังไม่มีในเครื่อง
