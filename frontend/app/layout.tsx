import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "KMITL Marketplace | ซื้อขายในรั้วพระจอมเกล้า",
  description: "ตลาดซื้อขายสินค้าสำหรับนักศึกษาและบุคลากร สจล.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th" suppressHydrationWarning><body><ThemeProvider><Navbar />{children}
    <footer className="border-t border-orange-200 bg-white py-10 text-center text-sm text-slate-500 dark:border-orange-900/40 dark:bg-[#140d08] dark:text-orange-100/60">
      KMITL Marketplace • ไม่ใช่เว็บไซต์ทางการของ สจล.
    </footer></ThemeProvider></body></html>;
}
