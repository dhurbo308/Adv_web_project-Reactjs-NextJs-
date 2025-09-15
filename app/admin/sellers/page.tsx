// "use client";
// import { useEffect, useState } from "react";
// import Layout from "../../../components/Layout";
// import { getAllAdmins, approveSeller } from "../../../services/adminService";
// import Link from "next/link";

// interface Seller {
//   id: number;
//   fullName: string;
//   status: string;
//   adminId?: number;
// }

// interface Admin {
//   id: number;
//   name: string;
//   email: string;
//   approvedSellers: Seller[];
// }

// export default function AdminSellers() {
//   const [admins, setAdmins] = useState<Admin[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const res = await getAllAdmins();
//         setAdmins(res);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAdmins();
//   }, []);

//   const handleApprove = async (adminId: number, sellerId: number) => {
//     try {
//       await approveSeller(adminId, sellerId);
//       alert("Seller approved successfully");

//       setAdmins((prev) =>
//         prev.map((admin) =>
//           admin.id === adminId
//             ? {
//                 ...admin,
//                 approvedSellers: admin.approvedSellers.map((seller) =>
//                   seller.id === sellerId ? { ...seller, status: "active" } : seller
//                 ),
//               }
//             : admin
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Failed to approve seller");
//     }
//   };

//   if (loading) return <Layout role="admin"><p>Loading...</p></Layout>;

//   return (
//     <Layout role="admin">
//       <h1 className="text-2xl font-bold mb-4">All Sellers</h1>
//       {admins.map((admin) => (
//         <div key={admin.id} className="mb-6 border p-4 rounded shadow bg-white">
//           <h2 className="font-semibold">{admin.name} (Admin)</h2>
//           <p>Email: {admin.email}</p>
//           <h3 className="mt-2 font-medium">Approved Sellers:</h3>
//           <ul>
//             {admin.approvedSellers?.map((seller) => (
//               <li key={seller.id} className="flex justify-between items-center mt-1">
//                 <Link
//                   href={`/admin/sellers/${seller.id}`}
//                   className="text-blue-600 hover:underline"
//                 >
//                   {seller.fullName} ({seller.status})
//                 </Link>
//                 {seller.status !== "active" && (
//                   <button
//                     onClick={() => handleApprove(admin.id, seller.id)}
//                     className="bg-green-600 text-white px-2 py-1 rounded"
//                   >
//                     Approve
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </Layout>
//   );
// }
// "use client";
// import { useEffect, useState } from "react";
// import { getAllAdmins, approveSeller } from "@/services/adminService";

// export default function AdminSellersPage() {
//   const [admins, setAdmins] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const res = await getAllAdmins();
//         setAdmins(res);
//       } catch (err) {
//         console.error("Failed to load admins:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAdmins();
//   }, []);

//   const handleApprove = async (adminId: number, sellerId: number) => {
//     try {
//       await approveSeller(adminId, sellerId);
//       alert("Seller approved ✅");
//       const res = await getAllAdmins();
//       setAdmins(res);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to approve seller ❌");
//     }
//   };

//   if (loading) return <p className="p-4">Loading sellers...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Admin Dashboard - Approve Sellers</h1>

//       {admins.map((admin) => (
//         <div key={admin.id} className="border rounded p-4 mb-4 shadow">
//           <h2 className="text-lg font-semibold">Admin: {admin.name}</h2>
//           <ul className="mt-2">
//             {admin.approvedSellers?.map((seller: any) => (
//               <li
//                 key={seller.id}
//                 className="flex justify-between items-center border-b py-2"
//               >
//                 <span>
//                   {seller.name} ({seller.status})
//                 </span>
//                 {seller.status !== "active" && (
//                   <button
//                     onClick={() => handleApprove(admin.id, seller.id)}
//                     className="bg-green-600 text-white px-3 py-1 rounded"
//                   >
//                     Approve
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }
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
    fetchAdmins();
  }, []);

  const handleDelete = async (sellerId: number) => {
    if (!confirm("Are you sure you want to delete this seller?")) return;
    try {
      await deleteSellerById(sellerId);
      alert("Seller deleted ");
      fetchAdmins();
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
