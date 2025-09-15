import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <Layout role="guest">
      
    {/* <div className="">
      <Image
            src="/foodpic.jpg"
            alt="Food Picture"
            
             width={1920} height={1080}
          />
      <div className=" flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold mb-6">Food Delivery Management System</h1>
        <div className="flex flex-col space-y-4">
          <Link href="/admin/login" className="px-4 py-2 bg-blue-600 text-white rounded">Admin Login</Link>
          <Link href="/seller/register" className="px-4 py-2 bg-green-600 text-white rounded">Seller Register</Link>
          <Link href="/seller/login" className="px-4 py-2 bg-gray-600 text-white rounded">Seller Login</Link>
        </div>
      </div>
    
    </div> */}
    <div className="relative w-screen h-screen">
  {/* Background Image */}
  <Image
    src="/foodpic.jpg"
    alt="Food Picture"
    fill
    className="object-cover"
  />

  {/* Overlay Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white">
    <h1 className="text-3xl font-bold mb-6">Food Delivery Management System</h1>
    <div className="flex flex-col space-y-4">
      <Link href="/admin/login" className="px-4 py-2 bg-blue-600 rounded">Admin Login</Link>
      <Link href="/seller/register" className="px-4 py-2 bg-green-600 rounded">Seller Register</Link>
      <Link href="/seller/login" className="px-4 py-2 bg-gray-600 rounded">Seller Login</Link>
    </div>
  </div>
</div>

    </Layout>
    
    
  );
}
