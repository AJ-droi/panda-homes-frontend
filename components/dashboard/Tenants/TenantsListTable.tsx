/* eslint-disable */
import Pagination from "@/components/PaginationComponent";
import { UserFilter } from "@/services/interface/filter";
import { useFetchTenantDetails} from "@/services/users/query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TenantsListTable = ({params}: {params:UserFilter}) => {

  const router = useRouter();
  const { data: users, isLoading } = useFetchTenantDetails(params);
  // const tenants = users ?? tenantsList;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate items to display on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users?.slice(indexOfFirstItem, indexOfLastItem);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

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
                Tenant Name
              </th>
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
                Move-in Date
              </th> */}
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
                    <td className="py-4 px-6 text-left">
                      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
                    </td>
                  </tr>
                ))
              )
              : currentItems?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-left py-6 text-gray-400">
                    No Tenants available
                  </td>
                </tr>
              ) : (
                currentItems?.map((item: any, index: any) => (
              <tr
                key={item.id}
                title="Click to view tenant"
                className="cursor-pointer transition-all duration-200 ease-in-out
                active:bg-gray-100
                lg:hover:bg-gray-100 lg:hover:shadow-sm lg:hover:scale-[1.05]"
                onClick={() => router.push(`/dashboard/view-tenant/${item.id}`)}
              >
                <td className="py-4 px-6 text-left"><Link href={`/dashboard/view-tenant/${item.id}`} className="hover:text-blue-600 hover:underline">{item.tenantName}</Link></td>
                <td className="py-4 px-6 text-left">{item.property}</td>
                {/* <td className={`py-4 px-6 text-left`}>{item.moveInDay}</td> */}
                <td
                  className={`py-4 text-left px-6 `}
                >
                  {item.rent}
                </td>

                <td className="py-4 px-6 text-left">{item.expiryDate}</td>
               
              </tr>
            )))}
          </tbody>
        </table>
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={users?.length}
        currentPage={currentPage}
       onPageChange={setCurrentPage}      />
    </div>
  );
};

export default TenantsListTable;
