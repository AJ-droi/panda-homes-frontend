// lib/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = () => {
  if (!socket) {
    const token = localStorage.getItem('access_token'); // Or from cookies/session if preferred

    socket = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
      transports: ['websocket'],
      auth: {
        token, // 👈 this will be available on socket.handshake.auth.token
      },
    });
  }

  return socket;
};


export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized');
  }
  return socket;
};

 export const generateServiceRequestId = () => {
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `SR${timestamp}${random}`; // e.g., SR893124X9K
  }

