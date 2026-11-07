import Link from "next/link";
const modules = [
  { title: "บัญชี / โปรไฟล์", path: "/login", owner: "เพื่อน 1" },
  { title: "สินค้า / ค้นหา", path: "/listings", owner: "เพื่อน 2" },
  { title: "ลงขาย / จอง", path: "/sell", owner: "เพื่อน 3" },
  { title: "แชต / รีวิว / แจ้งเตือน", path: "/messages", owner: "เพื่อน 4" },
];
export default function HomePage() {
  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-14">
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-orange-700">TEAM SOFTWARE ENGINEERING</p>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">KMITL Marketplace</h1>
      <p className="mt-5 max-w-2xl text-stone-600">โครงสร้างเริ่มต้นสำหรับทีม 5 คน — ยังไม่มีระบบ Login, OTP, ค้นหา, ลงขาย หรือ Chat จริง ทุก Feature จะเกิดจาก Git Commit และ Pull Request ของผู้รับผิดชอบ</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {modules.map((mod) => <Link key={mod.path} href={mod.path} className="rounded-2xl border border-orange-200 bg-white p-6 shadow-sm hover:border-orange-500">
          <p className="text-xs font-semibold text-orange-700">{mod.owner}</p>
          <h2 className="mt-2 text-xl font-bold">{mod.title}</h2>
          <p className="mt-2 text-sm text-stone-500">พื้นที่สำหรับพัฒนา Feature ในอนาคต</p>
        </Link>)}
      </div>
      <p className="mt-8 text-sm text-stone-500">เจ้าของ Repo รับผิดชอบโครงสร้างกลาง Database/API Contracts, GitHub CI และการรวมงาน</p>
    </main>
  );
}
