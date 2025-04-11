// services/property/query.ts
import { useQuery } from "@tanstack/react-query";
import { getProperties } from "./api";

export function useFetchPropertyDetails() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getProperties,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    select: (data:any) =>
      data.users.map((user: any) => ({
        id: user.id,
        tenantName: `${user.first_name} ${user.last_name}`,
        property: user.propertyName,
        moveInDay: new Date(user.moveInDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        rentStatus: user.rentPaid ? "Paid" : "Overdue",
      })),
  });
}
