
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
      src="https://tawk.to/chat/684bdd0665fb5d190dc1fbe1/1itk5eokt"
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
