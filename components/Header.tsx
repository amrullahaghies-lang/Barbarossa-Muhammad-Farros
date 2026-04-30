import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-slate-700 bg-navy/95 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-bold text-lg">Barbarossa Muhammad Farros</span>
        </Link>
        <Link href="/admin/login" className="text-sm bg-redAccent px-3 py-2 rounded-lg">Admin</Link>
      </div>
    </header>
  );
}
