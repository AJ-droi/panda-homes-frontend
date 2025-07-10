"use client";

interface AlertMessageProps {
  type: "success" | "error";
  message: string;
  onClose?: () => void;
}

export default function AlertMessage({
  type,
  message,
  onClose,
}: AlertMessageProps) {
  const isSuccess = type === "success";

  return (
    <div
      className={`rounded-lg p-4 mb-4 ${
        isSuccess
          ? "bg-green-50 border border-green-200 text-green-800"
          : "bg-red-50 border border-red-200 text-red-800"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isSuccess ? (
              <svg
                className="w-3 h-3 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-3 h-3 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <span className="font-medium">{message}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-3 text-sm font-medium hover:opacity-75 transition-opacity ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
