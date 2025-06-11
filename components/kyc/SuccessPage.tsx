"use client"
import { useRouter } from "next/navigation";
import Image from 'next/image'

export default function SuccessPage() {
    const router = useRouter();
  
    const handleClick = () => {
      router.push("/"); // Replace with your actual redirect route
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E5DDF8] px-4">
        <div className="bg-white rounded-2xl w-full max-w-xl text-center py-10 px-6 shadow-md">
          <div className="mb-6">
            <Image
              src="/landingPage/logo.png" // Update with your actual logo path
              alt="Panda Logo"
              width={100}
              height={38}
              className="mx-auto"
            />
          </div>
  
          <div className="flex justify-center mb-8">

              <div className="w-20 h-20 bg-[#F3EDFF] rounded-full flex items-center justify-center">
              <Image
              src="/success.png" // Update with your actual logo path
              alt="Panda Logo"
              width={100}
              height={38}
              className="mx-auto"
            />
              </div>
    
          </div>
  
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Account created successfully!
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-8">
            Welcome aboard! Start your success journey with Panda!
          </p>
  
          <button
            onClick={handleClick}
            className="bg-[#785DBA] hover:bg-[#8a6bc4] transition text-white px-6 py-3 rounded-lg font-medium text-sm md:text-base"
          >
            Let’s Start!
          </button>
        </div>
      </div>
    );
  }