import { useQuery } from "@tanstack/react-query";
import { getNoticeAgreementByTenant, getNoticeAgreements, NoticeAnalytics } from "./api";

export function useFetchNoticeAgreements() {
    return useQuery({
      queryKey: ["notice-agreement"],   
      queryFn: getNoticeAgreements,
      refetchOnMount: "always",
      refetchOnWindowFocus: true,
      select: (data:any) =>
        data.map((notice: any) => ({
          noticeType: notice.notice_type,
          tenant: notice.tenant_name,
          property: notice.property_name,
          dateSent:  new Date(notice.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          status:notice.status,
          notice_document: notice.notice_image
        })),
    });
  }

  export function useNoticeAnalytics(){
    return useQuery({
      queryKey: ["notice-analytics"],   
      queryFn: NoticeAnalytics,
      refetchOnMount: "always",
      refetchOnWindowFocus: true,
      // select:data
  })
}

export function useFetchNoticeAgreementByTenant() {
  return useQuery({
    queryKey: ["notice-agreement-by-tenant"],   
    queryFn: getNoticeAgreementByTenant,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    select: (data:any) =>
      data.map((notice: any) => ({
        noticeType: notice.notice_type,
        tenant: notice.tenant_name,
        property: notice.property_name,
        dateSent:  new Date(notice.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status:notice.status,
        notice_document: notice.notice_image
      })),
  });
}
