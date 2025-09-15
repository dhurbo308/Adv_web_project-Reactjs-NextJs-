"use client";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { getAllAdmins } from "../../../services/adminService";
import pusher from "../../../services/pusherClient";

interface Seller {
  id: number;
  fullName: string;
  status: string;
  adminId?: number;
}

interface Admin {
  id: number;
  name: string;
  email: string;
  approvedSellers: Seller[];
}

export default function AdminDashboard() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await getAllAdmins();
        setAdmins(res);
      } catch (err) {
        console.error(err);
        setError("You are not authorized. Please login.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  // useEffect(() => {
  //   const channel = pusher.subscribe("admins");

  //   channel.bind("new-seller", (data: any) => {
  //     setNotifications((prev) => [...prev, data.message]);
  //   });

  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };
  // }, []);

  if (loading) return <Layout role="admin"><p>Loading...</p></Layout>;
  if (error) return <Layout role="admin"><p className="text-red-600">{error}</p></Layout>;

  return (
    <Layout role="admin">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {/* <div className="mt-4">
          <h2 className="font-semibold">Notifications:</h2>
          <ul>
            {notifications.map((n, i) => (
              <li key={i} className="text-blue-600">{n}</li>
            ))}
          </ul>
        </div> */}
      {admins.map((admin) => (
        <div key={admin.id} className="mb-6 border p-4 rounded shadow bg-white">
          <h2 className="font-semibold">{admin.name}</h2>
          <p>Email: {admin.email}</p>
          <h3 className="mt-2 font-medium">Approved Sellers:</h3>
          <ul>
            {admin.approvedSellers?.map((seller) => (
              <li key={seller.id}>
                {seller.fullName} ({seller.status})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Layout>
  );
}
