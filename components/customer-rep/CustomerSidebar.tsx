"use client";
/*eslint-disable */
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useFetchChats } from "@/services/chat/query";

interface ChatSidebarProps {
  onSelect: (requestId: string) => void;
}

const CustomerSidebar = ({ onSelect }: ChatSidebarProps) => {
  const [activeChat, setActiveChat] = useState<any>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "resolved">("all");

  const { data: conversations = [] } = useFetchChats();

  const counts = {
    all: conversations.length,
    pending: conversations.filter((t: any) => t.status === "pending").length,
    resolved: conversations.filter((t: any) => t.status === "resolved").length,
  };

  const filteredConversations = conversations.filter((ticket: any) => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  return (
    <div className="md:w-96 w-full max-w-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-900">
          Service Requests
        </h1>
      </div>

      {/* Filter Tabs with counts */}
      <div className="flex justify-around border-b border-gray-200 bg-gray-50">
        {(["all", "pending", "resolved"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`relative flex flex-row items-center justify-center gap-x-2 py-2 w-full text-sm font-medium capitalize border-b-2 transition-colors ${
              filter === status
                ? "border-[#785DBA] text-[#785DBA] bg-white"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>{status}</span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                filter === status
                  ? "bg-[#785DBA] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {counts[status]}
            </span>
          </button>
        ))}
      </div>

      {/* Ticket List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((ticket: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                setActiveChat(ticket);
                onSelect(ticket.requestId);
              }}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeChat?.requestId === ticket.requestId
                  ? "bg-blue-50 border-blue-200"
                  : ""
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
                          {ticket.unread}
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
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No {filter} chats found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSidebar;
