import { useQuery } from "@tanstack/react-query";
import { getPropertyOverview } from "./api";

export function useFetchPropertyOverview() {
  return useQuery({
    queryKey: ["fetch-property-overview"],
    queryFn: () => getPropertyOverview(),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    select: (data: any) => 
      data.map((item:any) => ({
        id:item.id,
        date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      type: item.type,
      description: item.description,
      status: item.status
      }))
  });
}
