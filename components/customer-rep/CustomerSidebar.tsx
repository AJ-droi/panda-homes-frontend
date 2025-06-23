/* eslint-disable */
import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface ChatSidebarProps {
  onSelect: (requestId: string) => void;
}

interface Conversation {
  requestId: string;
  tenant_name: string;
  issue_category: string;
}

const CustomerSidebar = ({ onSelect }: ChatSidebarProps) => {
  const [activeChat, setActiveChat] = useState<any>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  //   {
  //     id: 1,
  //     name: "Jared Black",
  //     email: "darkknight@gmail.com",
  //     phone: "801-549-3492",
  //     lastContacted: "June 23, 2023",
  //     messages: [
  //       {
  //         id: 1,
  //         sender: "tenant",
  //         text: "Hi, I have a plumbing issue in my bathroom. The sink is leaking badly.",
  //         time: "2:15pm",
  //         type: "text",
  //       },
  //       {
  //         id: 2,
  //         sender: "tenant",
  //         text: "Here is a photo of the leak",
  //         time: "2:16pm",
  //         type: "file",
  //         fileName: "leak_photo.jpg",
  //       },
  //       {
  //         id: 3,
  //         sender: "rep",
  //         text: "Thank you for reporting this. I'll send a plumber to check it out today.",
  //         time: "2:45pm",
  //         type: "text",
  //       },
  //       {
  //         id: 4,
  //         sender: "tenant",
  //         text: "Great, thank you! When should I expect them?",
  //         time: "3:21pm",
  //         type: "text",
  //       },
  //     ],
  //     category: "plumbing",
  //     status: "active",
  //     priority: "high",
  //     apartment: "Unit 204",
  //     notes: "Urgent plumbing issue - sink leak in bathroom",
  //     unread: 2,
  //   },
  //   {
  //     id: 2,
  //     name: "Sarah Wilson",
  //     email: "sarah.w@email.com",
  //     phone: "555-0123",
  //     lastContacted: "June 22, 2023",
  //     messages: [
  //       {
  //         id: 1,
  //         sender: "tenant",
  //         text: "The electrical outlet in my kitchen stopped working.",
  //         time: "10:30am",
  //         type: "text",
  //       },
  //       {
  //         id: 2,
  //         sender: "rep",
  //         text: "I'll schedule an electrician to check this out.",
  //         time: "11:15am",
  //         type: "text",
  //       },
  //     ],
  //     category: "electrical",
  //     status: "active",
  //     priority: "medium",
  //     apartment: "Unit 105",
  //     notes: "Kitchen outlet not working",
  //     unread: 0,
  //   },
  //   {
  //     id: 3,
  //     name: "Mike Johnson",
  //     email: "mike.j@email.com",
  //     phone: "555-0456",
  //     lastContacted: "June 21, 2023",
  //     messages: [
  //       {
  //         id: 1,
  //         sender: "tenant",
  //         text: "HVAC system making strange noises",
  //         time: "9:00am",
  //         type: "text",
  //       },
  //       {
  //         id: 2,
  //         sender: "rep",
  //         text: "Technician has been dispatched and issue resolved.",
  //         time: "2:30pm",
  //         type: "text",
  //       },
  //     ],
  //     category: "hvac",
  //     status: "resolved",
  //     priority: "low",
  //     apartment: "Unit 301",
  //     notes: "HVAC noise issue - resolved",
  //     unread: 0,
  //   },
  // ]);

  // const [filter, setFilter] = useState("active");

  // const filteredTickets = tickets.filter(
  //   (ticket) => filter === "all" || ticket.status === filter
  // );

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chats`) // GET /chats
      .then((res) => res.json())
      .then(setConversations);
  }, []);


  return (

    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-900">
          Service Requests
        </h1>


      </div>

      {/* Ticket List */}
      <div className="flex-1 overflow-y-auto">
        {conversations?.map((ticket: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setActiveChat(ticket);
              onSelect(ticket.requestId);
            }}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              activeChat?.requestId === ticket.requestId ? "bg-blue-50 border-blue-200" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#785DBA] rounded-full flex items-center justify-center text-white font-medium">
                  {ticket.tenant_name
                    .split(" ")
                    .map((n: any) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">
                      {ticket.tenant_name}
                    </h3>
                    {ticket.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                        {ticket.messageCount}
                      </span>
                    )}
                  </div>
                
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {ticket.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">
                  {new Date(ticket.lastMessageAt).toLocaleDateString()}
                </span>
                {ticket.status === "resolved" && (
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerSidebar;
