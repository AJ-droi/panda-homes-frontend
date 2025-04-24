import { useQuery } from "@tanstack/react-query";
import { getDueRents } from "./api";

export function useFetchDueRents() {
    return useQuery({
      queryKey: ["due-rents"],
      queryFn: getDueRents,
      refetchOnMount: "always",
      refetchOnWindowFocus: true,
      select:(data) => 
        data.rents.map((rent: any) => ({
            id: rent.id, 
            property: rent.property.name,
            amountDue: rent.amount_paid,
            dueDate: new Date(rent.expiry_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            status:rent.status
        }))  
    });
  }
  