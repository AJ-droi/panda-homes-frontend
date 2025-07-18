/* eslint-disable */
import Modal from "@/components/Modal";
import Pagination from "@/components/PaginationComponent";
import { UserFilter } from "@/services/interface/filter";
import { useRemoveTenantMutation } from "@/services/rents/mutation";
import { useFetchTenantDetails } from "@/services/users/query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import TableHeader from "../TableHeader";

const TenantsListTable = ({
  params,
  handleSort,
}: {
  params: UserFilter;
  handleSort: any;
}) => {
  const router = useRouter();
  const { data: users, isLoading } = useFetchTenantDetails(params);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handleRemoveTenant = (tenant: any) => {
    setSelectedTenant(tenant);
    setShowModal(true);
  };

  const removeTenant = useRemoveTenantMutation();

  const confirmRemoveTenant = async () => {
    if (!selectedTenant) return;
    try {
      await removeTenant.mutateAsync(selectedTenant.id);
      window.location.reload();
      // Optionally refetch tenant list here
    } catch (error) {
      console.error("Failed to remove tenant", error);
    } finally {
      setShowModal(false);
      setSelectedTenant(null);
    }
  };

  const currentItems = React.useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return users?.slice(indexOfFirstItem, indexOfLastItem) || [];
  }, [users, currentPage, itemsPerPage]);

  return (
    <div className="max-w-full text-[#6E7079] overflow-hidden ">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-[#E1E2E9]">
              {/* ...other headers */}
              <TableHeader
                headertitle={"Name"}
                ascending={() => handleSort("name", "asc")}
                descending={() => handleSort("name", "desc")}
              />
              <TableHeader
                headertitle={"Property"}
                ascending={() => handleSort("property", "asc")}
                descending={() => handleSort("property", "desc")}
              />
              <TableHeader
                headertitle={"Rent"}
                ascending={() => handleSort("rent", "asc")}
                descending={() => handleSort("rent", "desc")}
              />
              <TableHeader
                headertitle={"Date"}
                ascending={() => handleSort("date", "asc")}
                descending={() => handleSort("date", "desc")}
              />
              <th className="text-left py-4  font-[400] px-6 text-[#785DBA]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            style={{ fontFamily: "Plus Jakarta Sans" }}
            className="border-b border-[#E1E2E9]"
          >
            {isLoading ? (
              <tr>
                <td colSpan={6}>Loading...</td>
              </tr>
            ) : currentItems?.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-gray-400">
                  No Tenants available
                </td>
              </tr>
            ) : (
              currentItems.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6">{item.tenantName}</td>
                  <td className="py-4 px-6">{item.property}</td>
                  <td className="py-4 px-6">{item.rent}</td>
                  <td className="py-4 px-6">{item.date}</td>
                  {item.property !== "No Property" && (
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleRemoveTenant(item)}
                        className="px-4 py-2 rounded text-white hover:cursor-pointer"
                        style={{ backgroundColor: "#785DBA" }}
                      >
                        Remove
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={users?.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        itemsPerPageOptions={[10, 25, 50, 100]}
        showNavigation
        showItemsPerPage
        showPageJumper
      />

      {/* Confirmation Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Confirm Removal</h2>
            <p>
              Are you sure you want to remove{" "}
              <strong>{selectedTenant?.tenantName}</strong> from{" "}
              <strong>{selectedTenant?.property}</strong>?
            </p>
            <div className="flex gap-4 justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemoveTenant}
                className="px-4 py-2 rounded text-white hover:cursor-pointer"
                style={{ backgroundColor: "#785DBA" }}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TenantsListTable;
