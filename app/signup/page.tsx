"use client";
import AuthForm from "@/components/AuthForm";
import FormShapes from "@/components/FormShapes";
import React from "react";
import Head from "next/head";
import LandingNavbar from "@/components/LandingPageNavbar";
import Footer from "@/components/Footer";

const Signup = () => {
  return (
    <div className="bg-white">
      <Head>
        <title>Signup Page | Panda App</title>
        <meta name="description" content="Signup page for Panda App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingNavbar />

      <div className="flex flex-col md:flex-row w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 mt-8 md:mt-20">
        <div className="md:w-1/2 hidden md:block">
          <FormShapes />
        </div>
        <div className="w-full md:w-1/2">
          <AuthForm isLogin={false} />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Signup;
