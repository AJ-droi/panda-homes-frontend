import BackButton from "@/components/Backbutton";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image"

const TenantServiceRequestHome = () => {
  const router = useRouter()
  return (
    <div className="text-[#000] px-[5%] py-[5%] ">
      <h3 className="mb-[3%] font-semibold text-xl md:text-2xl flex "> <BackButton /> <span>What would you like to do?</span></h3>
      <div className="flex flex-row bg-[#fff] md:hover:bg-[#eee] gap-4 justify-between p-4 rounded-lg shadow-md mb-[3%] mt-[5%]" onClick={() => router.push('/tenant-dashboard/service-requests/chat')} >
        <div>
          <h4 className="text-[#170F49] font-bold hover:underline">Start a New Request</h4>
          <p className="text-[12px]">Chat with us to report a new issue</p>
        </div>
       <Image src={'/arrow-right.svg'} width={20} height={20} alt="" />
      </div>
       <div className="flex flex-row bg-[#fff] md:hover:bg-[#eee] gap-4 justify-between p-4 rounded-lg shadow-md mb-[3%]"  onClick={() => router.push('/tenant-dashboard/service-requests/ongoing')}>
        <div>
          <h4 className="text-[#170F49] font-bold hover:underline">Ongoing Requests</h4>
          <p className="text-[12px]">Check the status of any unresolved or active service requests.</p>
        </div>
       <Image src={'/arrow-right.svg'} width={20} height={20} alt="" />
      </div>
       <div className="flex flex-row bg-[#fff] md:hover:bg-[#eee] gap-4 justify-between p-4 rounded-lg shadow-md mb-[3%]" onClick={() => router.push('/tenant-dashboard/service-requests/past')} >
        <div>
          <h4 className="text-[#170F49] font-bold hover:underline">Past Requests</h4>
          <p className="text-[12px]">Browse your previously resolved or closed service requests.</p>
        </div>
       <Image src={'/arrow-right.svg'} width={20} height={20} alt="" />
      </div>
    </div>
  );
};

export default TenantServiceRequestHome;
