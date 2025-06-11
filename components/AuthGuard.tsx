// components/AuthGuard.tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error("JWT Parse Error:", e);
    return null;
  }
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      router.replace('/');
      return;
    }

    const decoded = parseJwt(token);
    const expired = !decoded?.exp || decoded.exp * 1000 < Date.now();

    if (expired) {
      localStorage.removeItem('access_token');
      router.replace('/');
      return;
    }

    // Optional: Redirect based on role
    // if (decoded.role === 'tenant') {
    //   router.replace('/tenant-dashboard');
    // }
  }, [router]);

  return <>{children}</>;
}
