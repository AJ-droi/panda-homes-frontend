// components/BackButton.tsx
'use client';
/* eslint-disable */
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton(props:any) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm text-gray-700 hover:text-black"
    >
      <ArrowLeft className="w-4 h-4" />
       <h2
            className="text-lg font-semibold text-gray-900"
            style={{ fontFamily: "Inter" }}
          >{props.title || ""}</h2>
    </button>
  );
}


export function BackToLogin() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className="flex items-center gap-2 text-sm text-gray-700 hover:text-black p-5"
    >
      <ArrowLeft className="w-4 h-4" />
       <h2
            className="text-md font-plus-jarkarta text-gray-900"
            
          >Back to Login</h2>
    </button>
  );
}
