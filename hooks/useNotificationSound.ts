// hooks/useNotificationSound.ts
"use client";
import { useEffect, useRef } from "react";

export const useNotificationSound = () => {
  const audioRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/notification.wav");
    }
  }, []);

  const playNotification = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return playNotification;
};
