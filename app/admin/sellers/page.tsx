"use client";
import { useEffect, useState } from "react";
import { getAllAdmins } from "@/services/adminService";
import { deleteSellerById } from "@/services/sellerService";
import Link from "next/link";

export default function AdminSellersPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = async () => {
    try {
      const res = await getAllAdmins();
      setAdmins(res);
    } catch (err) {
      console.error("Failed to load admins:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();  //calls for data load
  }, []);

  const handleDelete = async (sellerId: number) => {
    if (!confirm("Are you sure you want to delete this seller?")) return;
    try {
      await deleteSellerById(sellerId);
      alert("Seller deleted ");
      fetchAdmins();//Refer list after delete a seller
    } catch (err) {
      console.error(err);
      alert("Failed to delete seller ");
    }
  };

  if (loading) return <p className="p-4">Loading sellers...</p>;

  return (
    <div className="bg-gradient-to-r from-green-200 to-blue-300 w-screen h-screen p-6">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard - Manage Sellers</h1>

      {admins.map((admin) => (
        <div key={admin.id} className="border rounded p-4 mb-4 shadow">
          <h2 className="text-lg font-semibold">Admin: {admin.name}</h2>
          <ul className="mt-2">
            {admin.approvedSellers?.map((seller: any) => (
              <li key={seller.id} className="flex justify-between items-center border-b py-2">  
                <Link href={`/admin/sellers/${seller.id}`} className="text-blue-600 hover:underline">
                  {seller.fullName} ({seller.status})
                </Link>
                <button onClick={() => handleDelete(seller.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
