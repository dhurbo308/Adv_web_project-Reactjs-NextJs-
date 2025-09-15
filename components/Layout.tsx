// "use client";
// import React from "react";
// import Link from "next/link";

// interface LayoutProps {
//   role: "admin" | "seller" ;
//   children: React.ReactNode;
// }

// export default function Layout({ role, children }: LayoutProps) {
//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <header className="mb-6 flex justify-between items-center bg-blue p-4 rounded shadow">
//         <h1 className="text-xl font-bold">{role.toUpperCase()} PORTAL</h1>
//         <nav className="space-x-4">
//           {role === "admin" && (
//             <>
//               <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link>
//               <Link href="/admin/sellers" className="hover:underline">Sellers</Link>
//               <Link href="/">Logout</Link>
//             </>
//           )}
//           {role === "seller" && (
//             <>
//               <Link href="/seller/dashboard" className="hover:underline">Dashboard</Link>
//               <Link href="/seller/profile" className="hover:underline">Profile</Link>
//               <Link href="/">Logout</Link>
//             </>
//           )}
//         </nav>
//       </header>
//       <main>{children}</main>
//     </div>
//   );
// }
"use client";
import { ReactNode } from "react";
import Link from "next/link";

export default function Layout({
  children,
  role,
}: {
  children: ReactNode;
  role: "guest" | "seller" | "admin";
}) {
  return (
    <div>
      <nav className="flex gap-4 p-4 bg-red-100 shadow">
        <Link href="/">Home</Link>
        {role === "guest" && (
          <>
            <Link href="/seller/login">Seller Login</Link>
            <Link href="/admin/login">Admin Login</Link>
          </>
        )}
        {role === "seller" && <Link href="/seller/profile">Profile</Link>}
        {role === "admin" && <Link href="/admin/sellers">Sellers</Link>}
        {role === "admin" && <Link href="/admin/profile">Profile</Link>}
      </nav>
      <main>{children}</main>
    </div>
  );
}
