// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "../../../services/api";
// import Layout from "../../../components/Layout";
// import Link from "next/link";

// export default function SellerLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/seller/login", { email });
//       if (res.data.seller) {
//         router.push("/seller/profile"); // Redirect to profile page
//       } else {
//         setError(res.data.message || "Invalid credentials");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Login failed");
//     }
//   };
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   try {
//     const res = await api.post("/seller/login", { email }, { withCredentials: true });
//     if (res.data.seller) {
//       router.push("/seller/profile");
//     } else {
//       setError(res.data.message || "Invalid credentials");
//     }
//   } catch (err) {
//     setError("Login failed");
//   }
// };

//   return (
//     <Layout role="seller">
//       <div className="flex justify-center mt-20">
//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 flex flex-col space-y-3">
//           <h2 className="text-xl font-bold mb-2">Seller Login</h2>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             className="p-2 border rounded"
//             required
//           />
//           {/* <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             className="p-2 border rounded"
//             required
//           /> */}
//           <button type="submit" className="bg-blue-600 text-white p-2 rounded">Login</button>
//           {error && <p className="text-red-600">{error}</p>}
//         </form>
//       </div>
//       <div className="flex justify-center">
//         <p>Donn't have account?</p>
//         <Link href="/seller/register">Create account</Link>
//       </div>
//     </Layout>
//   );
// }
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../components/Layout";
import { loginSeller } from "../../../services/sellerService";
import Link from "next/link";
export default function SellerLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginSeller(email);
      if (res.seller) {
        router.push("/seller/dashboard");
      } else {
        setError(res.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <Layout role="guest">
      <div className="bg-gradient-to-r from-red-200 to-yellow-100 w-screen h-screen">
            <div className="flex justify-center py-15">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 p-6 bg-yellow rounded shadow-md w-96"
                    >
                    <h2 className="text-xl font-bold">Seller Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Login
                    </button>
                    {error && <p className="text-red-600">{error}</p>}
                    <p>Don't have an account?<Link href="/seller/register" className="text-green">Create account</Link></p>
                   
                </form>
            </div>
            <div className="flex  justify-center">
             
            </div>
        </div>  
      
    </Layout>
  );
}
