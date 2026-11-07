# ติดตั้งคอม Windows ของเพื่อนทั้ง 5 คน

## โปรแกรมใน Windows (ต้องติดตั้งจริง)
- **Git for Windows** https://git-scm.com/downloads/win
- **VS Code** https://code.visualstudio.com/
- **Node.js LTS** https://nodejs.org/en/download (Next.js 16 ต้อง Node.js >= 20.9; แนะนำ LTS รุ่นปัจจุบัน)
- **Python 3.12 หรือ 3.13** https://www.python.org/downloads/windows/ (ติ๊ก Add Python to PATH; Python 3.13 ที่เจ้าของเคยใช้ก็ได้)
- **Chrome หรือ Edge** สำหรับเปิดเว็บไซต์และ DevTools
- **GitHub Desktop** https://desktop.github.com/ (เลือกใช้ได้ถ้าไม่ถนัด Git command; ไม่จำเป็นต้องมีถ้าใช้ Git CLI)
- **Docker Desktop** https://www.docker.com/products/docker-desktop/ (ทางเลือกเมื่อทีมพร้อมใช้ PostgreSQL; MVP scaffold ใช้ SQLite จึงไม่จำเป็น)
- PostgreSQL โปรแกรมติดตั้งแยก **ยังไม่ต้องติดตั้งในเครื่องเพื่อน**; Owner จะกำหนด DB Contract และ migration ในงานถัดไป

## Extensions ใน VS Code (แนะนำ)
- Python (`ms-python.python`)
- Pylance (`ms-python.vscode-pylance`)
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- GitLens (`eamodio.gitlens`) เป็นทางเลือก
- GitHub Pull Requests and Issues (`GitHub.vscode-pull-request-github`) เป็นทางเลือก

## เช็กเวอร์ชัน
```powershell
git --version
node --version
npm --version
py --version
```

## หลัง Clone (ทำครั้งแรกบนคอมแต่ละคน)
เปิด VS Code ที่ root repo → terminal 1:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\START_BACKEND.ps1
```

terminal 2:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\START_FRONTEND.ps1
```

สคริปต์จะสร้าง `backend/.venv`, ติดตั้ง Python dependencies, สร้าง `backend/.env`, `frontend/.env.local`, ติดตั้ง npm packages (ครั้งแรกต้องมีอินเทอร์เน็ต)

## ตรวจว่ารันได้
- http://127.0.0.1:8000/health -> `{"status":"ok","service":"team-scaffold"}`
- http://localhost:3000 -> หน้าโครงสร้างทีม 5 คน (ไม่ใช่ Marketplace feature จริง)
- Backend docs: http://127.0.0.1:8000/docs
- หากใช้ PowerShell ปิดหน้าต่าง/กด Ctrl+C เพื่อหยุดแต่ละ server

## Environment variables (ไม่ต้องใช้รหัสจริง)
- `backend/.env.example` -> `backend/.env` (สคริปต์คัดลอกให้)
- `frontend/.env.example` -> `frontend/.env.local` (สคริปต์คัดลอกให้)
- `DATABASE_URL=sqlite:///./marketplace_team.db` เฉพาะ local scaffolding; ไม่มี table ของ feature ในตอนนี้
- `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000`
- `ALLOWED_ORIGINS=http://localhost:3000`
- ค่าที่ขึ้นต้น `NEXT_PUBLIC_` เป็นข้อมูลสาธารณะ **ห้ามใส่ secrets**
- **ห้ามใช้ OTP จำลอง/โหมด test login** จาก Local Demo เก่าบน Repo ทีมนี้

## ตรวจ Quality ก่อน Push
```powershell
cd frontend
npm run lint
npm run typecheck
npm run build
cd ..\backend
.\.venv\Scripts\python.exe -m pytest -q
```

หากพิมพ์ `npm` ไม่เจอ: Restart VS Code หลังติดตั้ง Node.js; ถ้า `py` ไม่เจอ ตรวจ PATH
