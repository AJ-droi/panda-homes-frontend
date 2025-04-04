 import React from 'react'

interface CardProps {
    children: React.ReactNode
}
const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className='bg-white rounded-2xl shadow-2xl shadow-[#0000001A] border-1 border-[#F4F4F4]'>
        {children}
    </div>
  )
}

export default Card;
