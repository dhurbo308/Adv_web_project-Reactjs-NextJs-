"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { getSellerById } from "../../../../services/sellerService";

export default function AdminViewSeller() {
  const params = useParams();
  const { sellerId } = params;
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sellerId) return;

    const fetchSeller = async () => {
      try {
        const data = await getSellerById(Number(sellerId));
        setSeller(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [sellerId]);

  if (loading) return <Layout role="admin"><p>Loading...</p></Layout>;
  if (!seller) return <Layout role="admin"><p>Seller not found.</p></Layout>;

  return (
    <Layout role="admin">
      <h1 className="text-2xl font-bold mb-4">Seller Details (Admin View)</h1>
      <p><strong>Seller ID:</strong> {seller.id}</p>
      <p><strong>Full Name:</strong> {seller.fullName}</p>
      <p><strong>Email:</strong> {seller.email}</p>
      <p><strong>NID:</strong> {seller.nid}</p>
      <p><strong>Age:</strong> {seller.age}</p>
      <p><strong>Status:</strong> {seller.status}</p>
      {/* <p><strong>Admin ID:</strong> {seller.adminId || "Not Assigned"}</p> */}
    </Layout>
  );
}
