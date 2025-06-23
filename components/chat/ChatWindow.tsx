'use client';
/* eslint-disable */
import { useEffect, useState } from 'react';
import { initSocket, getSocket } from '@/services/chat/socket';

interface Message {
  id?: string;
  content: string;
  sender: string;
  requestId: string;
}

interface ChatWindowProps {
  requestId: string;
  sender: 'tenant' | 'admin'; // support both sides
}

export default function ChatWindow({ requestId, sender }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  console.log('ChatWindow mounted with requestId:', requestId);

useEffect(() => {
  const socket = initSocket();

  socket.emit('join', requestId);

  // ✅ Only fetch messages if requestId is defined
  if (requestId) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/request/${requestId}`)
      .then((res) => res.json())
      .then(setMessages)
      .catch((err) => {
        console.error('Error fetching messages:', err);
      });
  }

  socket.on('new_message', (msg: any) => {
    console.log('New message received:', msg);
    if (msg.service_request_id === requestId) {
      setMessages((prev) => [...prev, msg]);
    }
  });

  return () => {
    socket.off('new_message');
  };
}, [requestId]);



      console.log({messages})

  const sendMessage = () => {
    const socket = getSocket();
    const message: Message = {
      content: input,
      sender,
      requestId,
    };
    socket.emit('send_message', message);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full p-5">
      <div className="flex-1 overflow-y-auto border p-4 rounded">
        {messages?.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong className="capitalize">{msg.sender}</strong>: {msg.content}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
