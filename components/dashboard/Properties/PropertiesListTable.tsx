/*eslint-disable */
import Pagination from "@/components/PaginationComponent";
import { PropertyFilter } from "@/services/interface/filter";
import { useFetchPropertyDetails } from "@/services/property/query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PropertiesListTable = ({params}: {params:PropertyFilter}) => {
  // const propertyData = [
  //   {
  //     id: 1,
  //     property: "Lekki Flat A",
  //     location: "Lekki, Lagos",
  //     vacancy: "Vacant",
  //     rentOwed: "Nil",
  //   },
  //   {
  //     id: 2,
  //     property: "Abuja Duplex",
  //     location: "Wuse2, Abuja",
  //     vacancy: "Not Vacant",
  //     rentOwed: "₦1,200,000",
  //   },
  //   {
  //     id: 3,
  //     property: "Abuja Duplex",
  //     location: "Ikeja, Lagos",
  //     vacancy: "Not Vacant",
  //     rentOwed: "₦2,000,000",
  //   },
  //   {
  //     id: 4,
  //     property: "Abuja Duplex",
  //     location: "Ikeja, Lagos",
  //     vacancy: "Not Vacant",
  //     rentOwed: "₦500,000",
  //   },
  //   {
  //     id: 5,
  //     property: "Abuja Duplex",
  //     location: "Ikeja, Lagos",
  //     vacancy: "Not Vacant",
  //     rentOwed: "₦500,000",
  //   },
  //   {
  //     id: 6,
  //     property: "Ikeja Studio",
  //     location: "Ikeja, Lagos",
  //     vacancy: "Vacant",
  //     rentOwed: "Nil",
  //   },
  // ];

    const { data: properties, isLoading } = useFetchPropertyDetails(params)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Calculate items to display on current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = properties?.slice(indexOfFirstItem, indexOfLastItem);

    const router = useRouter()

  return (
    <div className="max-w-full text-[#6E7079] overflow-hidden ">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-[#E1E2E9]">
              <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Property 
              </th>
              {/* <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Location
              </th> */}
              <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Status
              </th>
              <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Rent 
              </th>

              <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Expiry Date 
              </th>
              {/* <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Action
              </th> */}
            </tr>
          </thead>
          <tbody
            className="leading-[145%]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
             {isLoading
              ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="py-4 px-6 text-left">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-left">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-left">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-left">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                    </td>
                    {/* <td className="py-4 px-6 text-left">
                      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
                    </td> */}
                  </tr>
                ))
              )
              : currentItems?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-left py-6 text-gray-400">
                    No Property Listing available
                  </td>
                </tr>
              ) : (
                currentItems?.map((item:any, index:number) => (
                  
                  <tr
                    role="button"
                  key={index}
                  title="Click to view property"
                  className="cursor-pointer transition-all duration-200 ease-in-out
                  active:bg-gray-100
                  lg:hover:bg-gray-100 lg:hover:shadow-sm lg:hover:scale-[1.01]"
                  onClick={() => router.push(`/dashboard/view-property/${item.id}`)}
                >
                
                
                <td className="py-4 px-6 text-left"><Link href={`/dashboard/view-property/${item.id}`} className="hover:text-blue-600 hover:underline">{item.property}</Link></td>
                {/* <td className="py-4 px-6 text-left">{item.location}</td> */}
                <td
                  className={`py-4 px-6 text-left `}
                >
                  {item.vacancy}
                </td>
                <td
                  className={`py-4 text-left px-6 ${
                    item.rent === "-" ? "''" : "text-[#34A853]"
                  }`}
                >
                  {item.rent}
                </td>
                <td className="py-4 px-6 text-left">{item.expiryDate || "-"}</td>
                {/* <td className="py-4 px-6 text-left">
                <button onClick={() => router.push(`/dashboard/view-property/${item.id}`)} className="bg-[#5E636614] text-[#8B8D97] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black px-[16px] py-[10px] rounded-[12px] text-sm">
                    View Details
                  </button>
                </td> */}
              </tr>
            )))}
          </tbody>
        </table>
      </div>

      <Pagination 
        itemsPerPage={itemsPerPage}
        totalItems={properties?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} totalPages={undefined}      />
    </div>
  );
};

export default PropertiesListTable;
