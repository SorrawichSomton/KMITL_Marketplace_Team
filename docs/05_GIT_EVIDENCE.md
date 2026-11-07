# หลักฐาน Git สำหรับอาจารย์

- ทุกคนสร้าง Issue และ Commit จากเครื่อง/บัญชี GitHub ของตัวเอง
- ทำ Commit ขนาดเล็กตามงานจริง เช่น `feat(catalog): add search form`, `test(catalog): filter invalid prices`
- เปิด PR พร้อม screenshot, ผล `npm run build` หรือ `pytest`, ลิงก์ Issue, files changed (อยู่ในเขตตนเอง)
- คนละ 2-4 PR ตลอดโครงงานตามงานจริง ไม่ต้องสร้าง commit เทียม
- Owner มี Commit จริงสำหรับ setup, project skeleton, CI, DB migrations, wiring/integration, contract docs และแก้ Merge Problems
- หน้า GitHub Insights > Contributors, Commits, Pull Requests และ Issues เป็นหลักฐานแยกคน
- เก็บ ADR ใน `docs/` และ PR descriptions เพื่อให้เห็น Design Decisions โดย Owner เป็นผู้ดูแล integration
