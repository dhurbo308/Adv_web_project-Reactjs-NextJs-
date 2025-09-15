"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellerSchema, SellerFormData } from "../../../schemas/sellerschemas";
import Layout from "../../../components/Layout";
import { createSeller } from "../../../services/sellerService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SellerRegister() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  
  const { register, handleSubmit, formState: { errors } } = useForm<SellerFormData>({
    resolver: zodResolver(sellerSchema),
  });

  const onSubmit = async (data: SellerFormData) => {
    try {
      await createSeller(data);
      setMessage("Seller registered successfully!");
      router.push("/seller/login");
    } catch (err) {
      console.error(err);
      setMessage("Failed to register seller");
    }
  };

  return (
    <Layout role="seller">
      <div className="bg-gradient-to-r from-green-200 to-blue-300 w-screen h-screen">
        <div className="flex justify-center mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-White p-6 rounded shadow-md w-96 flex flex-col space-y-3">
            <h2 className="text-xl font-bold mb-2">Seller Registration</h2>

            <input placeholder="Full Name" {...register("fullName")} className="p-2 border rounded"/>
            {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}

            <input placeholder="Email" {...register("email")} className="p-2 border rounded"/>
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}

            <input placeholder="NID" {...register("nid")} className="p-2 border rounded"/>
            {errors.nid && <p className="text-red-600">{errors.nid.message}</p>}

            <input type="number" placeholder="Age" {...register("age", { valueAsNumber: true })} className="p-2 border rounded"/>
            {errors.age && <p className="text-red-600">{errors.age.message}</p>}

            <input type="number" placeholder="Admin ID (optional)" {...register("adminId", { valueAsNumber: true })} className="p-2 border rounded"/>
            {errors.adminId && <p className="text-red-600">{errors.adminId.message}</p>}

            <button type="submit" className="bg-green-600 text-white p-2 rounded">Register</button>
            {message && <p className="text-green-600">{message}</p>}
          </form>
        </div>
          <div className="flex justify-center">
            <p>Already have an account?</p>
          <Link href="/seller/login" className="text-green">Login</Link>
          </div>
      </div>
      
      
    </Layout>
  );
}
