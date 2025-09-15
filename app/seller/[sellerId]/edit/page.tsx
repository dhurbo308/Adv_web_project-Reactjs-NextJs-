"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { getSellerById, updateSeller } from "../../../../services/sellerService";

export default function EditSeller() {
  const router = useRouter();
  const params = useParams();
  const sellerId = params.sellerId;
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeller = async () => {
      if (!sellerId) return;
      const data = await getSellerById(Number(sellerId));
      setForm(data);
      setLoading(false);
    };
    fetchSeller();
  }, [sellerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSeller(Number(sellerId), form);
    router.push(`/seller/${sellerId}`);
  };

  if (loading) return <Layout role="seller"><p>Loading...</p></Layout>;

  return (
    <Layout role="seller">
      <div className="bg-gradient-to-r from-blue-300 to-yellow-100 w-screen h-screen">
        <div className="flex justify-center py-15">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3 w-96">
            <h1 className="text-2xl font-bold mb-4">Edit Seller</h1>
            <input name="fullName" value={form.fullName || ""} onChange={handleChange} placeholder="Full Name" className="p-2 border rounded"/>
            <input name="email" value={form.email || ""} onChange={handleChange} placeholder="Email" className="p-2 border rounded"/>
            <input name="nid" value={form.nid || ""} onChange={handleChange} placeholder="NID" className="p-2 border rounded"/>
            <input name="age" type="number" value={form.age || 0} onChange={handleChange} placeholder="Age" className="p-2 border rounded"/>
            <input name="status" value={form.status || ""} onChange={handleChange} placeholder="Status" className="p-2 border rounded"/>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">Update Seller</button>
          </form>

        </div>
      </div>
    </Layout>
  );
}
// "use client";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Layout from "../../../../components/Layout";
// import { getSellerById, updateSeller, getSellerProfile} from "../../../../services/sellerService";

// export default function EditSeller() {
//   const router = useRouter();
//   const params = useParams();
//   const sellerId = Number(params.sellerId);
//   const [form, setForm] = useState<any>({});
//   const [loading, setLoading] = useState(true);
//   const [seller, setid] = useState(true);
//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     const checkAuthAndFetch = async () => {
//       try {
//         const myProfile = await getSellerProfile();
//         setid(myProfile);

//         if ( myProfile.id !== sellerId) {
//           router.push("/seller/profile");
//           return;
//         }

//         setAuthorized(true);
//         const data = await getSellerById(sellerId);
//         setForm(data);
//       } catch (err) {
//         console.error("Not authorized", err);
//         router.push("/seller/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAuthAndFetch();
//   }, [sellerId, router]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await updateSeller(sellerId, form);
//     router.push(`/seller/${sellerId}`);
//   };

//   if (loading) return <Layout role="seller"><p>Loading...</p></Layout>;
//   if (!authorized) return null;

//   return (
//     <Layout role="seller">
//       <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col space-y-3 w-96">
//         <input name="fullName" value={form.fullName || ""} onChange={handleChange} className="p-2 border rounded" />
//         <input name="email" value={form.email || ""} onChange={handleChange} className="p-2 border rounded" />
//         <input name="nid" value={form.nid || ""} onChange={handleChange} className="p-2 border rounded" />
//         <input name="age" type="number" value={form.age || 0} onChange={handleChange} className="p-2 border rounded" />
//         <input name="status" value={form.status || ""} onChange={handleChange} className="p-2 border rounded" />
//         <button type="submit" className="bg-blue-600 text-white p-2 rounded">Update</button>
//       </form>
//     </Layout>
//   );
// }
