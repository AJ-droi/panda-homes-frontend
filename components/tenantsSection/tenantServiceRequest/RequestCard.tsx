import React from "react";
/* eslint-disable */
const RequestCard = ({ request, type }: any) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [serviceRequest, setServiceRequest] = React.useState<any>(null);
  return (
    <>
      {request?.map((service_request: any, index: string) => (
        <div key={index} className="border-b border-[#E0E0E0] py-4">
          <h3 className="text-[18px] text-[#1B2559]">{service_request.issue}</h3>
          <button
            className="underline text-[#673AB7] py-2 text-[14px] font-semibold hover:cursor-pointer"
        
            onClick={(e) => {
              e.preventDefault();
              if (type === "past") {
                setIsModalOpen(true);
                setServiceRequest(service_request);
              }
              if (type === "ongoing") {
                window.location.href = `/tenant-dashboard/service-requests/${service_request.requestid}`;
              }
            }}
          >
            {type == "past" ? "View Summary" : "View Chat"}
          </button>
        </div>
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 z-50  bg-opacity-30 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
             
            <div className=" flex flex-col items-center justify-center text-[#fff] h-[95%] relative">
             <img
                src="/subtract.svg"
                alt="Service Request"
                className="w-[35%] mt-4 absolute mx-auto top-[10%]"
              />
              <div className="relative z-5">
                <div className="flex flex-col items-center justify-center border-b border-[#ccc] pb-5 ">
                  <h2 className="text-2xl font-bold mb-4">
                    SERVICE REQUEST SUMMARY
                  </h2>
                  <p className="text-gray-200">{serviceRequest?.property}</p>
                </div>
                <div className="mt-4 py-4">
                  <h3 className="text-lg font-semibold">Issue Description:</h3>
                  <p>{serviceRequest?.issue}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 justify-center">
                  <div className="border border-[#ccc] flex flex-col rounded-md p-3 ">
                    <h4>Reported By:</h4>
                    <p>Panda Rep</p>
                  </div>
                  <div className="border border-[#ccc] flex flex-col rounded-md p-3 ">
                    <h4>Status:</h4>
                    <p>Resolved</p>
                  </div>
                  <div className="border border-[#ccc] flex flex-col rounded-md p-3 ">
                    <h4>Date Submitted:</h4>
                    <p>{serviceRequest.created_at}</p>
                  </div>
                  <div className="border border-[#ccc] flex flex-col rounded-md p-3 ">
                    <h4>Date Resolved:</h4>
                    <p>{serviceRequest.date_resolved}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestCard;
