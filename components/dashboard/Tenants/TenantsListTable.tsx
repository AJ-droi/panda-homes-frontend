/* eslint-disable */
import Pagination from "@/components/PaginationComponent";
import { useFetchUserDetails } from "@/services/users/query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TenantsListTable = () => {
  // const tenantsList = [
  //   {
  //     id: 1,
  //     property: "Lekki Villa",
  //     tenantName: "John Doe",
  //     moveInDay: "Jan 1, 2024",
  //     rentStatus: "Paid",
  //   },
  //   {
  //     id: 2,
  //     property: "Abuja Heights",
  //     tenantName: "Jane Smith",
  //     moveInDay: "Feb 15, 2024",
  //     rentStatus: "Overdue",
  //   },
  //   {
  //     id: 3,
  //     property: "Ikeja Studio",
  //     tenantName: "Peter Okon",
  //     moveInDay: "Mar 10, 2023",
  //     rentStatus: "Overdue",
  //   },
  // ];
  const router = useRouter();
  const { data: users, isLoading } = useFetchUserDetails();
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
                className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Tenant Name
              </th>
              <th
                className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Property
              </th>
              <th
                className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Move-in Date
              </th>
              <th
                className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Rent Status
              </th>
              <th
                className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Action
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
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
                    </td>
                  </tr>
                ))
              )
              : currentItems?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
                    No Tenants available
                  </td>
                </tr>
              ) : (
                currentItems?.map((item: any, index: any) => (
              <tr
                key={item.id}
                className={`${
                  index !== users.length - 1 ? "" : ""
                } text-sm`}
              >
                <td className="py-4 px-6 text-center">{item.tenantName}</td>
                <td className="py-4 px-6 text-center">{item.property}</td>
                <td className={`py-4 px-6 text-center`}>{item.moveInDay}</td>
                <td
                  className={`py-4 text-center px-6 ${
                    item.rentStatus === "Overdue"
                      ? "text-[#EB4335]"
                      : "text-black"
                  }`}
                >
                  {item.rentStatus}
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => router.push("/dashboard/view-tenant")}
                    className="bg-[#5E636614] text-[#8B8D97] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black px-[16px] py-[10px] rounded-[12px] text-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={users?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TenantsListTable;
