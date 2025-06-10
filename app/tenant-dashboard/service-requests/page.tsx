
"use client"
import React from 'react';


// const socket = io('http://localhost:3150'); // your NestJS backend URL

// interface Message {
//   id: string;
//   sender: string;
//   text: string;
//   read: boolean;
//   createdAt: string;
// }

const ChatComponent = () => {

  return(
    <div className='bg-[#fafafe] min-h-screen'>
       <iframe
      src="https://tawk.to/chat/6848323f75c70f190ee42012/1itd093bu"
      style={{
        position: 'relative',
        top: 0,
        left: 0,
        width: '88vw',
        height: '90vh',
        border: 'none',
        zIndex: 0,
      }}
      allow="microphone; camera"
    />
    </div>
       

  )
};

export default ChatComponent;
