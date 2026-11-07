# สร้าง Repo ใหม่ และทำงานร่วมกันบน GitHub (Windows)

## เจ้าของสร้าง Repo
1. เปิด https://github.com/new → ชื่อแนะนำ `KMITL-Marketplace-Team5` → เลือก **Private** → **อย่าเลือก Initialize README/.gitignore/license** (ZIP มีไฟล์แล้ว) → Create repository
2. แตก ZIP, เปิด VS Code → File > Open Folder ที่โฟลเดอร์ `KMITL_Marketplace_Team5_Scaffold` แล้วใช้ terminal ที่ root
3. รันคำสั่งด้านล่าง (แทน `YOUR_GITHUB_USERNAME`):

```powershell
git init -b main
git add .
git commit -m "chore(scaffold): initialize team architecture and ownership"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/KMITL-Marketplace-Team5.git
git push -u origin main
```

`git init -b main` ใช้กับ Git รุ่นใหม่; ถ้าล้มเหลวให้ `git init` แล้ว `git branch -M main`

4. GitHub repo > **Settings > Collaborators / Access > Add people** เชิญเพื่อน 4 คนด้วย GitHub username; รอทุกคน Accept Invitation
5. ตั้ง Settings > Branches / Rulesets: ป้องกัน `main`, ต้องใช้ PR, Require status checks และ review เมื่อ plan/repo รองรับ; ห้าม force push; ตรวจ GitHub Actions ผ่านก่อน Merge
6. สร้าง GitHub Issues คนละงาน แล้ว Assign ให้เจ้าของงานจริง + เปิด GitHub Project หากต้องการ Kanban

## เพื่อนแต่ละคน Clone
- ติดตั้ง Git และ Login GitHub Desktop หรือ Git credential manager ก่อน
- เปิด VS Code Terminal (PowerShell) ใน Downloads หรือพื้นที่ที่ต้องการ:

```powershell
git clone https://github.com/YOUR_GITHUB_USERNAME/KMITL-Marketplace-Team5.git
cd KMITL-Marketplace-Team5
git switch -c feature/accounts-login  # ตัวอย่างของเพื่อน 1 เท่านั้น
```

สาขาของแต่ละคน:
- Owner `feature/owner-integration`
- Friend 1 `feature/accounts-login`
- Friend 2 `feature/catalog-search`
- Friend 3 `feature/trading-sell`
- Friend 4 `feature/community-chat`

## ทุกครั้งก่อนเริ่มงานใหม่

```powershell
git switch main
git pull --ff-only origin main
git switch -c feature/accounts-otp-validation  # เปลี่ยนให้ตรงกับงานของตัวเอง
```

แล้วแก้เฉพาะโฟลเดอร์ของตัวเอง → ทดสอบ → `git status` → add เฉพาะไฟล์ของตัวเอง → commit → push → PR

```powershell
git add frontend/app/login frontend/features/accounts backend/app/features/accounts backend/tests/accounts
git commit -m "feat(accounts): implement local login validation"
git push -u origin feature/accounts-otp-validation
```

เปิด GitHub PR: base=`main` compare=`feature/accounts-otp-validation`; อีกคน Review, เจ้าของอนุมัติ Merge หลัง CI ผ่าน

## อย่าทำ
- อย่า push ตรงเข้า main, อย่าแชร์ account GitHub, อย่าใช้ `git add .` หากไม่ตรวจ `git status`
- อย่า commit `.env`, `.env.local`, SQLite database, `node_modules`, `.next`, `venv`, OTP, access tokens
- อย่าเอา Repo เดิมของ Railway มา overwrite repo ทีมใหม่หรือเชื่อม Railway production โดยยังไม่ได้ Review
- อย่าใช้ commit author ปลอมหรือสร้าง git history ปลอมเพื่อคะแนน; ทุกคนต้อง Commit งานที่ทำจริงด้วยบัญชีตัวเอง

## GitHub Desktop (ทางเลือก)
File > Clone Repository > URL → เปิดใน VS Code → สร้าง Branch > Commit to branch > Publish branch > Create Pull Request. Terminal สะดวกกว่าเมื่ออยากรัน lint/test.
