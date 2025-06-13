/* eslint-disable */
import NoDataAvailable from "../NoDataComponent";
import DocumentCard from "./DocumentCard";

const DocumentsList = ({ documents = [], onView, onDownload }:any) => {
  if (documents.length === 0) {
    return <NoDataAvailable />;
  }
  return (
    <div className="divide-y divide-gray-100">
      {documents?.map((doc:any, index:string) => (
        <DocumentCard
          key={index}
          filedoc={doc.notice_document}
          filename={doc.noticeType}
          onView={onView}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};

export default DocumentsList