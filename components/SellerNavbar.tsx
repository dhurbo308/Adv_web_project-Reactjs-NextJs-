import Link from "next/link";

export default function SellerNavbar() {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">Seller Panel</div>
      <div className="space-x-4">
        <Link href="/seller/dashboard">Dashboard</Link>
        <Link href="/seller/profile">Profile</Link>
        <Link href="/">Logout</Link>
      </div>
    </nav>
  );
}
