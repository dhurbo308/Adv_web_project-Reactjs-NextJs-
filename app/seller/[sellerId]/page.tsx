"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { getSellerById } from "../../../services/sellerService";

export default function SellerDetail() {
  const params = useParams();
  const sellerId = params.sellerId;
  const [seller, setSeller] = useState<any>(null);

  useEffect(() => {
    if (!sellerId) return;
    const fetchSeller = async () => {
      const data = await getSellerById(Number(sellerId));
      setSeller(data);
    };
    fetchSeller();
  }, [sellerId]);

  if (!seller) return <Layout role="seller"><p>Loading...</p></Layout>;

  return (
    <Layout role="seller">
      <div className="bg-gradient-to-r from-blue-300 to-green-200 w-screen h-screen">
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Seller Details</h1>
        <p><strong>Full Name:</strong> {seller.fullName}</p>
        <p><strong>Email:</strong> {seller.email}</p>
        <p><strong>NID:</strong> {seller.nid}</p>
        <p><strong>Age:</strong> {seller.age}</p>
        <p><strong>Status:</strong> {seller.status}</p>
        {/* <p><strong>Admin ID:</strong> {seller.adminid ||"Not assinged"}</p> */}
        </div> 
      </div> 
    </Layout>
  );
}
