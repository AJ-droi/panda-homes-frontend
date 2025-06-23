"use client";
/* eslint-disable */
import { useEffect, useState } from "react";
import { initSocket, getSocket } from "@/services/chat/socket";
import {
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Send,
  CheckCheck,
} from "lucide-react";
import CustomerRightSidebar from "./CustomerRightSidebar";

interface Message {
  id?: string;
  content: string;
  sender: string;
  requestId: string;
  serviceRequest?: {
    id: string;
    tenant_name: string;
    property_name: string;
    status: string;
    lastContacted?: string;
  };
}

interface ChatWindowProps {
  requestId: string;
  sender: "tenant" | "admin"; // support both sides
}

const CustomerMainChatArea = ({ requestId, sender }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const socket = initSocket();

    socket.emit("join", requestId);

    socket.emit("mark_read", { requestId, sender });

    // ✅ Only fetch messages if requestId is defined
    if (requestId) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/request/${requestId}`)
        .then((res) => res.json())
        .then(setMessages)
        .catch((err) => {
          console.error("Error fetching messages:", err);
        });
    }

    socket.on("new_message", (msg: any) => {
      if (msg.service_request_id === requestId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("new_message");
    };
  }, [requestId]);

  const markAsResolved = async (ticketId: any) => {
    try {
      // This would call your NestJS endpoint
      const response = await fetch("/api/tickets/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId, status: "resolved" }),
      });
    } catch (error) {
      console.error("Error resolving ticket:", error);
    }
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    const socket = getSocket();
    const message: Message = {
      content: input,
      sender,
      requestId,
    };
    console.log("Sending message:", message);
    socket.emit("send_message", message);
    setInput("");
  };

  let userInfo = messages[0]?.serviceRequest;

  return (
    <>
      <div className="flex-1 flex flex-col">
        {requestId ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#785DBA] rounded-full flex items-center justify-center text-white font-medium">
                    {userInfo?.tenant_name
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {userInfo?.tenant_name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {userInfo?.property_name}{" "}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Mail className="w-5 h-5" />
                  </button>
                  {userInfo?.status === "pending" && (
                    <button
                      onClick={() => markAsResolved(userInfo?.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark as Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages?.map((message: any) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === "admin"
                        ? "bg-[#EBF4FF] text-black"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    {message.type === "file" ? (
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">{message.fileName}</span>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                    <p
                      className={`text-xs mt-1 flex gap-x-2 ${
                        message.sender === "admin"
                          ? "text-[#000]"
                          : "text-gray-500"
                      }`}
                    >
                      {message.sender === sender &&
                        (message.isRead ? (
                          <CheckCheck className="w-4 h-4 text-blue-500" />
                        ) : (
                          <CheckCheck className="w-4 h-4 text-gray-400" />
                        ))}
                      {new Date(message.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}

            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage(e)}
                  placeholder="Type your message"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#785DBA] focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="px-6 py-3  text-white rounded-lg bg-[#785DBA] focus:outline-none focus:ring-2 focus:ring-[#785DBA] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium">Select a conversation</h3>
              <p className="text-sm">
                Choose a service request from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>

      <CustomerRightSidebar activeChat={userInfo} />
    </>
  );
};

export default CustomerMainChatArea;
