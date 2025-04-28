import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./api";

export function useFetchUserDetails() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    select: (data: any) =>
      data?.users?.map((user: any) => ({
        id: user?.id,
        tenantName: `${user?.first_name ?? ""} ${user?.last_name ?? ""}`,
        property: user?.propert_tenants?.[0]?.property?.name ?? "No Property",
        moveInDay: user?.moveInDate
          ? new Date(user.moveInDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "N/A",
        rentStatus: user?.rentPaid ? "Paid" : "Overdue",
      })) ?? [],
  });
}
