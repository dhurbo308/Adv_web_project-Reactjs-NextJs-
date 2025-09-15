// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Layout from "../../../components/Layout";
// import { loginAdmin } from "../../../services/adminService";

// export default function AdminLogin() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await loginAdmin(email, password);
//       if (res.admin) {
//         router.push("/admin/sellers");
//       } else {
//         setError(res.message || "Invalid credentials");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Login failed");
//     }
//   };

//   return (
//     <Layout role="admin">
//       <div className="flex justify-center mt-20">
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col gap-3 p-6 bg-white rounded shadow-md w-96"
//         >
//           <h2 className="text-xl font-bold">Admin Login</h2>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="p-2 border rounded"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="p-2 border rounded"
//             required
//           />
//           <button type="submit" className="bg-blue-600 text-white p-2 rounded">
//             Login
//           </button>
//           {error && <p className="text-red-600">{error}</p>}
//         </form>
//       </div>
//     </Layout>
//   );
// }
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../components/Layout";
import { loginAdmin } from "../../../services/adminService";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginAdmin(email, password);
      if (res.admin) {
        router.push("/admin/dashboard");
      } else {
        setError(res.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <Layout role="guest">
      <div className="bg-gradient-to-r from-green-100 to-yellow-100 w-screen h-screen">
          <div className="flex justify-center py-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 p-6 bg-green rounded shadow-md w-96"
            >
              <h2 className="text-xl font-bold">Admin Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded"
                required
              />
              <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                Login
              </button>
              {error && <p className="text-red-600">{error}</p>}
            </form>
          </div>
      </div>
      
    </Layout>
  );
}
