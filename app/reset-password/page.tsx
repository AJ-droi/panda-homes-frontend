"use client";
import FormShapes from "@/components/FormShapes";
import React, { Suspense } from "react";
import Head from "next/head";
import LandingNavbar from "@/components/LandingPageNavbar";
import Footer from "@/components/Footer";
import ResetForm from "@/components/ResetForm";

const ResetPassword = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Head>
        <title>Login Page | Panda App</title>
        <meta name="description" content="Login page for Panda App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingNavbar />

      <main className="flex-grow">
        <div className="flex flex-col md:flex-row w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 mt-8 md:mt-20 mb-8 md:mb-20">
          <div className="md:w-1/2 hidden md:block">
            <FormShapes />
          </div>
          <div className="w-full md:w-1/2">
          <Suspense fallback={<h3>Loading.....</h3>}>
          <ResetForm />
          </Suspense>
    
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPassword ;