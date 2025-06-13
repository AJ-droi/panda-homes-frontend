// components/TawkToWidget.tsx
"use client"
import { useEffect } from 'react';

const TawkToWidget = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // const Tawk_API = window.Tawk_API || {};
    // const Tawk_LoadStart = new Date();

    const s1 = document.createElement('script');
    s1.src = 'https://embed.tawk.to/6848323f75c70f190ee42012/1itd093bu';
    s1.async = true;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    document.head.appendChild(s1);

    return () => {
      // Optional: cleanup if needed
      const existingScript = document.querySelector(
        'script[src*="tawk.to"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // This component only loads the script
};

export default TawkToWidget;
