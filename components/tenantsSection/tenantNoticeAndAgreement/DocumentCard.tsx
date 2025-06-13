import { FileText} from "lucide-react";
/* eslint-disable */

const DocumentCard = ({
  filename,
  filedoc,
//   onView,
//   onDownload,
  className = "",
}: any) => {


  return (
    <div
      className={`flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group ${className}`}
    >
      <div className="flex items-center space-x-3">
        <FileText size={20} className="text-gray-500" />
        <a
          href={filedoc}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 font-medium hover:underline hover:text-[#785DBA]"
        >
          {filename}
        </a>
      </div>
{/* 
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {onView && (
          <button
            onClick={() => onView(filedoc)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="View document"
          >
            <Eye size={16} />
          </button>
        )}
        {onDownload && (
          <button
            onClick={() => onDownload(filedoc)}
            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
            title="Download document"
          >
            <Download size={16} />
          </button>
        )}
      </div> */}

    </div>
  );
};

export default DocumentCard;
