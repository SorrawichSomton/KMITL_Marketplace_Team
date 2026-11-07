import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-orange-200 bg-white/90">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="text-lg font-bold text-orange-700">KMITL Marketplace</Link>
        <span className="text-sm text-stone-600">Team5 • Starter only</span>
      </nav>
    </header>
  );
}
