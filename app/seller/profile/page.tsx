// "use client";
// import { useEffect, useState } from "react";
// import Layout from "../../../components/Layout";
// import api from "../../../services/api";
// import { getMyProfile } from "@/services/sellerService";
// import router from "next/router";

// export default function SellerProfile() {
//   const [seller, setSeller] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await api.get("/seller/me");
  //       setSeller(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProfile();
  // }, []);

//   useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       const profile = await getMyProfile();
//       setSeller(profile);
//     } catch (err) {
//       router.push("/seller/login"); // redirect if not logged in
//     }
//   };
//   fetchProfile();
// }, []);

//   if (loading) return <Layout role="seller"><p>Loading...</p></Layout>;
//   if (!seller) return <Layout role="seller"><p>No profile found</p></Layout>;

//   return (
//     <Layout role="seller">
//       <h1 className="text-2xl font-bold mb-4">Seller Profile</h1>
//       <p><strong>Full Name:</strong> {seller.fullName}</p>
//       <p><strong>Email:</strong> {seller.email}</p>
//       <p><strong>NID:</strong> {seller.nid}</p>
//       <p><strong>Age:</strong> {seller.age}</p>
//       <p><strong>Status:</strong> {seller.status}</p>
//       {/* <p><strong>Admin ID:</strong> {seller.adminId || "Not Assigned"}</p> */}
//     </Layout>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../components/Layout";
import { getSellerProfile, logoutSeller } from "../../../services/sellerService";

export default function SellerProfile() {
  const router = useRouter();
  const [seller, setSeller] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getSellerProfile();
        setSeller(data);
      } catch {
        router.push("/seller/login");
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    await logoutSeller();
    router.push("/seller/login");
  };
const handleEdit = async () => {
    const data = await getSellerProfile();
    router.push(`/seller/${data.id}/edit`);
  };
  if (!seller) return <p>Loading...</p>;

  return (
    <Layout role="seller">
      <div className="bg-gradient-to-r from-green-200 to-blue-300 w-screen h-screen">
        <div className=" p-6">
          <h1 className="text-2xl font-bold">Welcome, {seller.fullName}</h1>
          <p>Email: {seller.email}</p>
          <p>id: {seller.id}</p>
          <p><strong>Email:</strong> {seller.email}</p>
          <p><strong>NID:</strong> {seller.nid}</p>
          <p><strong>Age:</strong> {seller.age}</p>
          <p><strong>Status:</strong> {seller.status}</p>
          <button onClick={handleLogout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
            Logout
          </button>
          <button  onClick={handleEdit} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
           Editprofile
          </button>     
        </div>
      </div>
      
    </Layout>
  );
}
