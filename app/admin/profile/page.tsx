"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../components/Layout";
import { getAdminProfile, logoutAdmin } from "../../../services/adminService";

export default function AdminProfile() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getAdminProfile();
        setAdmin(data);
      } catch {
        router.push("/admin/login");
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
  };

  if (!admin) return <p>Loading...</p>;

  return (
    <Layout role="admin">
      <div className="bg-gradient-to-r from-blue-200 to-green-300 w-screen h-screen p-6">
        <h1 className="text-2xl font-bold">Welcome, {admin.name}</h1>
        <p>Email: {admin.email}</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </Layout>
  );
}
