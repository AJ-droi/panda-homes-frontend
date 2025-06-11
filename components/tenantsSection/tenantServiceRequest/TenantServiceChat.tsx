"use client"
/*eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { User, MessageSquare, Send } from 'lucide-react';

export default function CustomerServiceChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! Thanks for reaching out. Plumbing issues can be frustrating — let's get this sorted quickly. Kindly tell us more about the issue and where it's happening (e.g., kitchen sink, bathroom tap, etc.).",
      timestamp: new Date(Date.now() - 120000) // 2 minutes ago
    },
    {
      id: 2,
      sender: 'user',
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      timestamp: new Date(Date.now() - 60000) // 1 minute ago
    },
    {
      id: 3,
      sender: 'bot',
      text: "Hi there! Thanks for reaching out. Plumbing issues can be frustrating — let's get this sorted quickly. Kindly tell us more about the issue and where it's happening (e.g., kitchen sink, bathroom tap, etc.).",
      timestamp: new Date(Date.now() - 30000) // 30 seconds ago
    },
    {
      id: 4,
      sender: 'user',
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e:any) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text: "Thank you for providing those details. I've received your message and will get back to you shortly with a solution. Is there anything else I can help you with in the meantime?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (timestamp:any) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen w-full">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
          Need help with your apartment?
        </h1>
        <p className="text-gray-600">
          Let's start with a few quick questions. If you need to speak to someone, we're right here with you.
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'bot'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {message.sender === 'bot' ? (
                <MessageSquare className="w-5 h-5" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>

            {/* Message Content */}
            <div
              className={`max-w-2xl ${
                message.sender === 'user' ? 'text-right' : ''
              }`}
            >
              <div
                className={`p-4 rounded-lg ${
                  message.sender === 'bot'
                    ? message.id === 2 || message.id === 4
                      ? 'bg-blue-50 border-2 border-blue-500 border-dashed'
                      : 'bg-gray-50'
                    : 'bg-gray-100'
                }`}
              >
                <p className="text-gray-800 leading-relaxed">{message.text}</p>
              </div>
              <span className="text-xs text-gray-500 mt-1 block">
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
            placeholder="Type your message"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="px-6 py-3 bg-gradient-to- from-[#4A25E1] to-[#7B5AFF] text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}