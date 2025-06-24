import { useRouter } from "next/navigation";
import React from "react";

const TenantServiceRequestHome = () => {
  const router = useRouter()
  return (
    <div className="text-[#000] px-[5%] py-[3%]">
      <h3 className="mb-[3%] font-semibold text-2xl">What would you like to do?</h3>
      <div className="flex flex-row bg-[#fff] gap-4 justify-between p-4 rounded-lg shadow-md mb-[3%]">
        <div>
          <h4 className="text-[#170F49] font-bold">Start a New Request</h4>
          <p className="text-[12px]">Chat with us to report a new issue</p>
        </div>
        <button onClick={() => router.push('/tenant-dashboard/service-requests/chat')} className="bg-[#ECEBFF] text-[#4A3AFF] text-[14px] px-4 py-2 rounded-4xl  transition-colors">
          Start Chat
        </button>
      </div>
       <div className="flex flex-row bg-[#fff] gap-4 justify-between p-4 rounded-lg shadow-md mb-[3%]">
        <div>
          <h4 className="text-[#170F49] font-bold">Ongoing Requests</h4>
          <p className="text-[12px]">Check the status of any unresolved or active service requests.</p>
        </div>
        <button onClick={() => router.push('/tenant-dashboard/service-requests/ongoing')} className="bg-[#ECEBFF] text-[#4A3AFF] text-[14px] px-4 py-2 rounded-4xl  transition-colors">
          View
        </button>
      </div>
       <div className="flex flex-row bg-[#fff] gap-4 justify-between p-4 rounded-lg shadow-md mb-[3%]">
        <div>
          <h4 className="text-[#170F49] font-bold">Past Requests</h4>
          <p className="text-[12px]">Browse your previously resolved or closed service requests.</p>
        </div>
        <button onClick={() => router.push('/tenant-dashboard/service-requests/past')} className="bg-[#ECEBFF] text-[#4A3AFF] text-[14px] px-4 py-2 rounded-4xl  transition-colors">
          View
        </button>
      </div>
    </div>
  );
};

export default TenantServiceRequestHome;
