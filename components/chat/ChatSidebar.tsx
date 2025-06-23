'use client';

import { useEffect, useState } from 'react';

interface ChatSidebarProps {
  onSelect: (requestId: string) => void;
}

interface Conversation {
  requestId: string;
  tenant_name: string;
  issue_category: string;
}

export default function ChatSidebar({ onSelect }: ChatSidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chats`) // GET /chats
      .then((res) => res.json())
      .then(setConversations);
  }, []);

  return (
    <div className="w-64 border-r h-full p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Conversations</h2>
      {conversations?.map((conv) => (
        <div
          key={conv.requestId}
          className="p-2 cursor-pointer hover:bg-gray-200"
          onClick={() => onSelect(conv.requestId)}
        >
          <div className="font-semibold">{conv.tenant_name}</div>
          <div className="text-sm text-gray-600">{conv.issue_category}</div>
        </div>
      ))}
    </div>
  );
}
