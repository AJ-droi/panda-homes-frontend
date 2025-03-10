"use client"
import AuthForm from '@/components/AuthForm';
import FormShapes from '@/components/FormShapes';
import React from 'react';
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';

const Login = () => {
  return (
    <div className='bg-white min-h-screen flex flex-col'>
      <Head>
        <title>Login Page | Panda App</title>
        <meta name="description" content="Login page for Panda App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow">
        <div className="flex flex-col md:flex-row w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 mt-8 md:mt-20 mb-8 md:mb-20">
          <div className="md:w-1/2 hidden md:block">
            <FormShapes />
          </div>
          <div className="w-full md:w-1/2">
            <AuthForm isLogin={true} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login;