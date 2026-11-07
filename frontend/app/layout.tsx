import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/shell/site-header";

export const metadata: Metadata = {
  title: "KMITL Marketplace | Team5 Scaffold",
  description: "โครงสร้างเริ่มต้นสำหรับนักพัฒนา 5 คน (ยังไม่มีระบบซื้อขายจริง)",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>
        <SiteHeader />
        {children}
        <footer className="border-t border-orange-200 p-6 text-center text-sm text-stone-600">
          KMITL Marketplace • ไม่ใช่เว็บไซต์ทางการของ สจล.
        </footer>
      </body>
    </html>
  );
}
