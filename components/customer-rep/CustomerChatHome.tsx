
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, Clock, CheckCircle, User, FileText, Wrench, Zap, Droplets, Home } from 'lucide-react';

const CustomerRepDashboard = () => {
  const [activeChat, setActiveChat] = useState<any>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [tickets, setTickets] = useState([
    {
      id: 1,
      name: 'Jared Black',
      email: 'darkknight@gmail.com',
      phone: '801-549-3492',
      lastContacted: 'June 23, 2023',
      messages: [
        { id: 1, sender: 'tenant', text: 'Hi, I have a plumbing issue in my bathroom. The sink is leaking badly.', time: '2:15pm', type: 'text' },
        { id: 2, sender: 'tenant', text: 'Here is a photo of the leak', time: '2:16pm', type: 'file', fileName: 'leak_photo.jpg' },
        { id: 3, sender: 'rep', text: 'Thank you for reporting this. I\'ll send a plumber to check it out today.', time: '2:45pm', type: 'text' },
        { id: 4, sender: 'tenant', text: 'Great, thank you! When should I expect them?', time: '3:21pm', type: 'text' }
      ],
      category: 'plumbing',
      status: 'active',
      priority: 'high',
      apartment: 'Unit 204',
      notes: 'Urgent plumbing issue - sink leak in bathroom',
      unread: 2
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      phone: '555-0123',
      lastContacted: 'June 22, 2023',
      messages: [
        { id: 1, sender: 'tenant', text: 'The electrical outlet in my kitchen stopped working.', time: '10:30am', type: 'text' },
        { id: 2, sender: 'rep', text: 'I\'ll schedule an electrician to check this out.', time: '11:15am', type: 'text' }
      ],
      category: 'electrical',
      status: 'active',
      priority: 'medium',
      apartment: 'Unit 105',
      notes: 'Kitchen outlet not working',
      unread: 0
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.j@email.com',
      phone: '555-0456',
      lastContacted: 'June 21, 2023',
      messages: [
        { id: 1, sender: 'tenant', text: 'HVAC system making strange noises', time: '9:00am', type: 'text' },
        { id: 2, sender: 'rep', text: 'Technician has been dispatched and issue resolved.', time: '2:30pm', type: 'text' }
      ],
      category: 'hvac',
      status: 'resolved',
      priority: 'low',
      apartment: 'Unit 301',
      notes: 'HVAC noise issue - resolved',
      unread: 0
    }
  ]);

  const [filter, setFilter] = useState('active');

  const filteredTickets = tickets.filter(ticket => 
    filter === 'all' || ticket.status === filter
  );

  const getCategoryIcon = (category:any) => {
    switch(category) {
      case 'plumbing': return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'electrical': return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'hvac': return <Home className="w-4 h-4 text-green-500" />;
      default: return <Wrench className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority:any) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sendMessage = () => {
    if (!chatMessage.trim() || !activeChat) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'rep',
      text: chatMessage,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      type: 'text'
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === activeChat.id 
        ? { ...ticket, messages: [...ticket.messages, newMessage] }
        : ticket
    ));

    setChatMessage('');
  };

  const markAsResolved = async (ticketId:any) => {
    try {
      // This would call your NestJS endpoint
      const response = await fetch('/api/tickets/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId, status: 'resolved' })
      });

      if (response.ok) {
        setTickets(prev => prev.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, status: 'resolved' }
            : ticket
        ));
        
        if (activeChat && activeChat.id === ticketId) {
          setActiveChat((prev:any) => ({ ...prev, status: 'resolved' }));
        }
      }
    } catch (error) {
      console.error('Error resolving ticket:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Ticket List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Service Requests</h1>
          
          {/* Filter Tabs */}
          <div className="flex mt-3 bg-gray-100 rounded-lg p-1">
            {['active', 'resolved', 'all'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`flex-1 px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  filter === status 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status === 'active' && (
                  <span className="ml-1 bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {tickets.filter(t => t.status === 'active').length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Ticket List */}
        <div className="flex-1 overflow-y-auto">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setActiveChat(ticket)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeChat?.id === ticket.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-medium">
                    {ticket.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{ticket.name}</h3>
                      {ticket.unread > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                          {ticket.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {getCategoryIcon(ticket.category)}
                      <span className="text-sm text-gray-600">{ticket.apartment}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 truncate">{ticket.notes}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">{ticket.lastContacted}</span>
                  {ticket.status === 'resolved' && (
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-medium">
                    {activeChat.name.split(' ').map((n:any) => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{activeChat.name}</h2>
                    <p className="text-sm text-gray-600">{activeChat.apartment} • Last contacted: {activeChat.lastContacted}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Mail className="w-5 h-5" />
                  </button>
                  {activeChat.status === 'active' && (
                    <button 
                      onClick={() => markAsResolved(activeChat.id)}
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
              {activeChat.messages.map((message:any) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'rep' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'rep' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-900'
                  }`}>
                    {message.type === 'file' ? (
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">{message.fileName}</span>
                      </div>
                    ) : (
                      <p className="text-sm">{message.text}</p>
                    )}
                    <p className={`text-xs mt-1 ${
                      message.sender === 'rep' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            {activeChat.status === 'active' && (
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium">Select a conversation</h3>
              <p className="text-sm">Choose a service request from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Contact Details */}
      {activeChat && (
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">First Name:</span>
                  <span className="text-sm text-gray-900">{activeChat.name.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Last Name:</span>
                  <span className="text-sm text-gray-900">{activeChat.name.split(' ')[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Phone Number:</span>
                  <span className="text-sm text-gray-900">{activeChat.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <span className="text-sm text-gray-900 truncate">{activeChat.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Apartment:</span>
                  <span className="text-sm text-gray-900">{activeChat.apartment}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
              <textarea
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add notes about this request..."
                defaultValue={activeChat.notes}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Category:</span>
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(activeChat.category)}
                    <span className="text-sm text-gray-900 capitalize">{activeChat.category}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Priority:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(activeChat.priority)}`}>
                    {activeChat.priority}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeChat.status === 'resolved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {activeChat.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerRepDashboard;