/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, Clock, CheckCircle, User, FileText, Wrench, Zap, Droplets, Home, X, Menu } from 'lucide-react';
import CustomerSidebar from './CustomerSidebar';
import { generateServiceRequestId } from '@/services/chat/socket';
import CustomerMainChatArea from './CustomerMainChatArea';

const CustomerRepDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
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



    const requestId = generateServiceRequestId() // Example request ID, replace with actual logic if needed
     const [activeRequestId, setActiveRequestId] = useState<string>('');

  return (
   <div className="relative flex flex-col md:flex-row min-h-screen bg-gray-50 text-[#000]">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-md hover:cursor-pointer"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="w-5 h-5 text-gray-800" />
      </button>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col shadow-lg md:hidden">
          {/* <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold text-lg">Service Requests</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div> */}
          <CustomerSidebar
            onSelect={(id) => {
              setActiveRequestId(id);
              setSidebarOpen(false);
            }}
          />
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block md:w-96 border-r border-gray-200 bg-white">
        <CustomerSidebar onSelect={setActiveRequestId} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-row">
        <CustomerMainChatArea requestId={activeRequestId} sender="admin" />
      </div>
    </div>
  );
};

export default CustomerRepDashboard;