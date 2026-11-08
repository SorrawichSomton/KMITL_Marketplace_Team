# KMITL Marketplace — GitHub & Railway ขั้นตอนทำจริง

## สิ่งที่แก้ให้ใน ZIP นี้
- แก้ React Hooks lint ใน Listing, Liquid Glass FAQ, Liquid Glass Toggle
- ThemeProvider ใช้ next-themes แต่รักษา `useMarketplaceTheme()` เดิม
- เพิ่ม next-themes ใน package.json และ Dockerfile รองรับ PORT บน Railway
- หน้าปก Aether Flow สีส้ม **ไม่ได้แก้**

## 1. ตรวจใน VS Code
เปิดโฟลเดอร์ที่แตก ZIP และเปิด Terminal ที่ root:

```powershell
cd frontend
npm install
npx tsc --noEmit
npm run lint
npm run build
cd ..
```

ถ้า lint ยังมี warnings เรื่อง `<img>` เป็นคำแนะนำด้านประสิทธิภาพ ไม่ใช่ errors (หาก CI ไม่ตั้ง `--max-warnings=0`) แต่ต้องทำให้ 0 errors ก่อน Merge.

## 2. นำไฟล์เข้า GitHub PR #1 แบบไม่ทิ้งประวัติเก่า
**อย่าลบ .git ของ repository ที่ clone** และอย่า `git init` ทับ. ให้ใช้โฟลเดอร์ `KMITL-Marketplace-Deploy` ที่ clone จาก GitHub เป็นปลายทาง แล้วเปิด PowerShell ในโฟลเดอร์นั้น:

```powershell
git switch feature/liquid-glass-deployment
```

จากนั้นใช้ Explorer คัดลอกเนื้อหา ZIP ที่แตกมา (frontend, backend, docs, .github และไฟล์เอกสาร) ไปวางใน `KMITL-Marketplace-Deploy` โดย **ไม่คัดลอก .git, node_modules, .next, .env, .env.local**. ถ้าจะใช้ robocopy ให้กำหนด path ต้นทางตามเครื่องจริง:

```powershell
robocopy "C:\PATH\TO\KMITL_Marketplace_Liquid_Glass_Theme" . /E /XD .git node_modules .next __pycache__ /XF .env .env.local
```

ตรวจทุกครั้ง:

```powershell
git status
git diff --stat
git add frontend backend DEPLOY_AND_GIT_TH.md
git status --short
git commit -m "fix(frontend): fix liquid glass lint and prepare Railway deployment"
git push origin feature/liquid-glass-deployment
```

ตรวจ PR: https://github.com/SorrawichSomton/KMITL-Marketplace/pull/1 แล้วรอให้ Backend Tests / Frontend lint-build ผ่าน **ก่อน Merge**.

## 3. Railway (ต้องทำในบัญชี Railway ของกลุ่ม)
1. เชื่อม GitHub repo `SorrawichSomton/KMITL-Marketplace` กับ Railway และเลือก deploy จาก `main` หลัง merge.
2. เพิ่ม PostgreSQL plugin/service.
3. Backend service: Root Directory `backend`, Dockerfile `Dockerfile`, public domain + ตั้งค่า PORT ตาม Railway. Attach Volume ที่ `/app/uploads` สำหรับรูปสินค้า.
4. ตั้ง Backend Variables บน Railway (อย่าใส่ใน Git):
   - `ENV=production`
   - `DATABASE_URL` เป็น URL PostgreSQL จาก Railway โดยใช้ `postgresql+psycopg://...` ตามค่าที่ Railway สร้างจริง
   - `SECRET_KEY` เป็นค่าสุ่มอย่างน้อย 32 ตัวอักษร (ใช้ `python -c "import secrets; print(secrets.token_urlsafe(48))"` เพื่อสร้าง)
   - `FRONTEND_ORIGINS=https://<frontend-domain>`
   - `API_PUBLIC_URL=https://<backend-domain>`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM` ที่ใช้งานจริง
5. Frontend service: Root Directory `frontend` และกำหนด `NEXT_PUBLIC_API_URL=https://<backend-domain>` เป็น **build variable**; สั่ง redeploy/build เมื่อแก้ค่า. ตั้ง public domain.
6. เปิดหน้าเว็บ HTTPS, ทดสอบ `/health`, OTP จริง, cookie login, browse, ลงสินค้า, อัปโหลดรูป, dark/light switch, FAQ แล้วดู service logs.

**สำคัญ:** ตอนนี้โค้ด Backend บังคับ SMTP ใน Production; ถ้ายังไม่มี SMTP ระบบ production จะไม่ start. ห้ามเปลี่ยนเป็น development บนเว็บ public เพราะ API จะเปิดเผย dev OTP.

**ข้อจำกัด:** Frontend กับ Backend เป็นคนละโดเมนบน Railway ทำให้ cookie แบบ cross-site บางเบราว์เซอร์ถูกบล็อกได้แม้ใช้ SameSite=None. สำหรับระบบล็อกอินที่เชื่อถือได้ แนะนำ custom domain เดียวกันคนละ subdomain เช่น `app.example.com` และ `api.example.com`, หรือทำ reverse proxy same-site ก่อนเปิดจริง. และต้องมี volume/backup สำหรับ Postgres และ uploads รวมถึง DB migrations แทน `create_all` สำหรับงาน Production ระยะยาว.

## CI/CD
Workflow เดิม `.github/workflows/ci-cd.yml` จะตรวจ Frontend และ Backend บน PR; deploy hook ปัจจุบันเป็น Render/Vercel ไม่ใช่ Railway. Railway GitHub Integration สามารถ deploy เมื่อ main มี commit ใหม่ได้เมื่อเปิด Auto Deploy. ต้องตั้งค่าบน Railway เอง จึงจะถือว่า deploy อัตโนมัติทำงานจริง.

## Security checklist
- ห้าม Commit `.env`, รหัสผ่าน, App Password, `SECRET_KEY` จริง
- ใช้ HTTPS และ Production SMTP ก่อนเปิดให้คนทั่วไปใช้
- ตรวจ `npm audit`, dependency updates และสิทธิ์ของฟอนต์ Colasta ก่อนเผยแพร่
- ทดสอบบนมือถือ/คอมอีกเครื่อง และแสดงหลักฐาน CI/CD ในงานอาจารย์
