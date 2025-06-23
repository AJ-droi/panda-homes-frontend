"use client";
/*eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { User, MessageSquare, Send, CheckCheck } from "lucide-react";
import { initSocket, getSocket } from "@/services/chat/socket";
import { create } from "domain";

interface Message {
  id?: string;
  content: string;
  sender: string;
  requestId: string;
  created_at?: Date; // Optional, for timestamp
}

interface ChatWindowProps {
  requestId: string;
  sender: "tenant" | "admin"; // support both sides
}

export default function TenantServiceChat({
  requestId,
  sender,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const socket = initSocket();
    socket.emit("join", requestId);

    socket.emit("mark_read", { requestId, sender });

    if (requestId) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/request/${requestId}`)
        .then((res) => res.json())
        .then((fetchedMessages) => {
          const welcomeMessage = {
            id: "system-welcome",
            content:
              "Welcome to your service request chat! How can we assist you today?",
            sender: "admin",
            requestId,
            isSystem: true,
          };

          // ✅ Ensure system message always appears first
          setMessages([welcomeMessage, ...fetchedMessages]);
        });
    }

    socket.on("new_message", (msg: any) => {
      console.log("New message received:", msg);
      if (msg.service_request_id === requestId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    // content: 'You are not a tenant of any property. Please contact your property manager for assistance.',

    return () => {
      socket.off("new_message");
    };
  }, [requestId]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // const newMessage = {
    //   id: messages.length + 1,
    //   sender: 'user',
    //   text: inputMessage,
    //   timestamp: new Date()
    // };

    // setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    // setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const socket = getSocket();
      const message: Message = {
        content: inputMessage,
        sender,
        requestId,
      };
      socket.emit("send_message", message, (response: any) => {
        console.log(response);
        if (response?.error) {
          console.error("Emit error:", response.error);

          // Append fallback system message
          const fallbackMessage: Message = {
            content:
              "⚠️ You are not a tenant of any property. Please contact your property manager for assistance.",
            sender: "admin",
            requestId,
          };

          setMessages((prev) => [...prev, fallbackMessage]);
        }
      });
      setInputMessage("");
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (timestamp: any) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-7xl mx-auto bg-white min-h-screen w-full">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
          Need help with your apartment?
        </h1>
        <p className="text-gray-600">
          Let's start with a few quick questions. If you need to speak to
          someone, we're right here with you.
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        {messages.map((message: any) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.sender === "tenant" ? "flex-row-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === "admin"
                  ? "bg-[#785DBA] text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {message.sender === "admin" ? (
                <MessageSquare className="w-5 h-5" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>

            {/* Message Content */}
            <div
              className={`max-w-2xl ${
                message.sender === "tenant" ? "text-right" : ""
              }`}
            >
              <div
                className={`p-4 rounded-lg ${
                  message.sender === "admin"
                    ? "bg-blue-50 border-2 border-blue-500 border-dashed"
                    : "bg-gray-100"
                }`}
              >
                <p className="text-gray-800 leading-relaxed">
                  {message.content}
                </p>
              </div>
              <span className="text-xs text-gray-500 mt-1 block">
                {message?.created_at
                  ? new Date(message.created_at).toLocaleTimeString()
                  : ""}
              </span>
              {message.sender === sender &&
                (message.isRead ? (
                  <CheckCheck className="w-4 h-4 text-blue-500" />
                ) : (
                  <CheckCheck className="w-4 h-4 text-gray-400" />
                ))}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#785DBA] text-white flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t p-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage(e)}
            placeholder="Type your message"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#785DBA] focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="px-6 py-3  text-white rounded-lg bg-[#785DBA] focus:outline-none focus:ring-2 focus:ring-[#785DBA] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
