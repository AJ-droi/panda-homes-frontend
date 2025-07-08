"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

const PageNotFound: FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
        <div className="text-indigo-600 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>

        <p className="text-gray-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-indigo-600 hover:cursor-pointer hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200"
          >
            Go Back
          </button>

          <Link
            href="/"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium rounded-lg transition duration-200 hover:cursor-pointer"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
