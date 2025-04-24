// services/users/query.ts
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./api";

export function useFetchUserDetails() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
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

