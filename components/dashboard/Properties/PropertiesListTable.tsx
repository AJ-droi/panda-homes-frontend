/*eslint-disable */
import Pagination from "@/components/PaginationComponent";
// import { PropertyFilter } from "@/services/interface/filter";
import { useFetchPropertyDetails } from "@/services/property/query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import GroupPropertyModal from "../GroupPropertyModal";
import Image from "next/image";
import TableHeader from "../TableHeader";

const PropertiesListTable = ({
  properties,
  isLoading,
  handleSearch,
  handleSort,
}: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate items to display on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = React.useMemo(() => {
    return properties?.slice(indexOfFirstItem, indexOfLastItem) || [];
  }, [properties, indexOfFirstItem, indexOfLastItem]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  return (
    <div>
      <div className="max-w-full text-[#6E7079] overflow-hidden ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-[#E1E2E9]">
                <TableHeader
                  headertitle={"Property"}
                  ascending={() => handleSort("name", "asc")}
                  descending={() => handleSort("name", "desc")}
                />
                {/* <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Location
              </th> */}
                <TableHeader
                  headertitle={"Status"}
                  ascending={() => handleSort("property_status", "asc")}
                  descending={() => handleSort("property_status", "desc")}
                />
                <TableHeader
                  headertitle={"Rent"}
                  ascending={() => handleSort("rent", "asc")}
                  descending={() => handleSort("rent", "desc")}
                />

                <TableHeader
                  headertitle={"Expiry Date"}
                  ascending={() => handleSort("expiry", "asc")}
                  descending={() => handleSort("expiry", "desc")}
                />
                {/* <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Action
              </th> */}
              </tr>
            </thead>
            <tbody
              className="leading-[145%] border-b border-[#E1E2E9]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              {isLoading ? (
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
              ) : currentItems?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-left py-6 text-gray-400">
                    No Property Listing available
                  </td>
                </tr>
              ) : (
                currentItems?.map((item: any, index: number) => (
                  <tr
                    role="button"
                    key={index}
                    title="Click to view property"
                    className="cursor-pointer transition-all duration-200 ease-in-out
                  active:bg-gray-100
                  lg:hover:bg-gray-100 lg:hover:shadow-sm lg:hover:scale-[1.01]"
                    onClick={() =>
                      router.push(`/dashboard/view-property/${item.id}`)
                    }
                  >
                    <td className="py-4 px-6 text-left">
                      <Link
                        href={`/dashboard/view-property/${item.id}`}
                        className="hover:text-blue-600 hover:underline"
                      >
                        {item.property}
                      </Link>
                    </td>
                    {/* <td className="py-4 px-6 text-left">{item.location}</td> */}
                    <td className={`py-4 px-6 text-left `}>{item.vacancy}</td>
                    <td
                      className={`py-4 text-left px-6 ${
                        item.rent === "-" ? "''" : "text-[#34A853]"
                      }`}
                    >
                      {item.rent}
                    </td>
                    <td className="py-4 px-6 text-left">
                      {item.expiryDate || "-"}
                    </td>
                    {/* <td className="py-4 px-6 text-left">
                <button onClick={() => router.push(`/dashboard/view-property/${item.id}`)} className="bg-[#5E636614] text-[#8B8D97] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black px-[16px] py-[10px] rounded-[12px] text-sm">
                    View Details
                  </button>
                </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={properties?.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPageOptions={[10, 25, 50, 100]}
          showNavigation
          showItemsPerPage
          showPageJumper
        />
      </div>
      {/* <button
        className="bg-[#785DBA] text-white text-[12px] font-semibold py-2 px-4 w-[25%] mt-4 rounded-md flex justify-center justify-self-end"
        onClick={() => setIsModalOpen(true)}
      >
        Group Properties
      </button> */}

      <GroupPropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PropertiesListTable;
