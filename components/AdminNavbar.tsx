import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">Admin Panel</div>
      <div className="space-x-4">
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/sellers">Sellers</Link>
        <Link href="/">Logout</Link>
      </div>
    </nav>
  );
}
