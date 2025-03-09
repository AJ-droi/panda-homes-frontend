"use client"
import AuthForm from '@/components/AuthForm';
import FormShapes from '@/components/FormShapes';
import React from 'react';
import Head from "next/head";
import Navbar from "@/components/Navbar";

const Signup = () => {
  return (
    <div className='bg-white'>
         <Head>
        <title>Landing Page | Panda App</title>
        <meta name="description" content="Landing page for Panda App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

    <div className='flex mt-20 px-40'>
        <div className='md:w-1/2'>
            <FormShapes />
        </div>
        <div className='md:w-1/2'>
      <AuthForm isLogin={false}/>
        </div>
    </div>
    </div>
  )
}

export default Signup; 