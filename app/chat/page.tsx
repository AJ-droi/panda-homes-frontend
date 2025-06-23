"use client"
import ChatSidebar from '@/components/chat/ChatSidebar'
import ChatWindow from '@/components/chat/ChatWindow'
import React, {useState} from 'react'

const Page = () => {
   const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
 
 
   return (
     <div className="flex h-screen bg-[#fff] text-[#000]">
       <ChatSidebar onSelect={(id) => setActiveRequestId(id)} />
         <div className="flex-1 p-4">
        {activeRequestId ? (
           <ChatWindow requestId={activeRequestId} sender="tenant" />
         ) : (
           <p>Select a conversation from the sidebar</p>
         )}
         </div>
   
    </div>

  )
}

export default Page