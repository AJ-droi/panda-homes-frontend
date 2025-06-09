"use client";
import React from "react";
import AuthForm from "@/components/AuthForm";
import Image from 'next/image'

export default function Home() {
  return (
    <div className="">
      {/* <Head>
        <title>Login Page | Panda App</title>
        <meta name="description" content="Login page for Panda App" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      {/* 
      <LandingNavbar /> */}
      <div className="flex flex-col md:flex-row min-h-screen justify-between w-full ">
        <div className="flex flex-col justify-between items-start md:min-h-screen md:w-[50%] py-[2%] px-[2%]">
          <Image src="/panda-white.svg" alt="" width={80} height={80} />
          <h3 className="font-plus-jarkarta text-left text-[25px] md:text-[35px] text-[#fff] py-[5%] md:py-[0%]">
            One Platform. <br /> Endless Possibilities.
          </h3>

          <p className="text-[12px]"> You can reach us at hello@getpanda.co </p>
        </div>
        <main className="flex  items-end md:min-h-screen mx-auto w-[100%] md:w-[40%] ">
          <AuthForm isLogin={true} />
        </main>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
// export default function Home() {
//   const isNotDesktop = useMatchMediaQuery(device.desktop);
//   return (
//     <div>
//       <Head>
//         <title>Landing Page | Panda App</title>
//         <meta name="description" content="Landing page for Panda App" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       {/* background: linear-gradient(224.89deg, rgba(70, 95, 241, 0.0851) 12.36%, rgba(70, 95, 241, 0.23) 87.59%); */}

//       <LandingNavbar />

//       <div className="flex flex-col md:flex-row relative text-[#000]">
//         <div className="md:w-1/2 px-4 sm:px-6 md:px-10 lg:px-[100px] bg-gradient-to-b  from-[#E0DEF7] to-[#fff] w-full flex flex-col min-h-screen md:overflow-y-auto py-10 z-10">
//           <div className="w-full max-w-[600px]">
//             <div className="">
//               <h1 className="font-[700] font-plus-jakarta leading-[110%] tracking-[-0.01em] text-[32px] sm:text-[48px] lg:text-[64px] flex justify-start">
//               Automate and Simplify property management.
//               </h1>
//               <h3 className="my-6 md:my-10 font-[500] font-plus-jakarta w-full max-w-[448px] leading-[160%] tracking-[-0.005em] text-[16px] sm:text-[18px] lg:text-lg flex justify-start">
//               Easily manage tenants, rent collections and services - all  in one platform.
//               </h3>
//             </div>
//           </div>

//           {/* {!isNotDesktop && (
//             <div className="absolute animate__animated animate__slideInLeft left-0 right-100 mt-[400px] flex justify-center z-20">
//               <LandingPageTrackCard />
//             </div>
//           )}
//           <section className={`w-full flex flex-row sm:flex-row sm:items-start gap-[40px] sm:gap-[80px]`}
//             style={{ marginTop: isNotDesktop ? "50px" : "120px" }}
//           >
//             <div className="flex flex-col items-center sm:items-start">
//               <div className="relative w-[50px] h-[50px]">
//                 <Image
//                   src="/landingPage/renters.png"
//                   alt="Icon for renters"
//                   width={50}
//                   height={50}
//                   style={{ objectFit: "contain" }}
//                   priority
//                 />
//               </div>
//               <div className="mt-4 text-center sm:text-left">
//                 <div className="text-[#785DBA] font-plus-jakarta leading-[110%] tracking-[-0.01em] font-[700] text-[20px] sm:text-[24px]">
//                   50k+ renters
//                 </div>
//                 <div className="font-plus-jakarta text-[#000929] leading-[110%] tracking-[-0.01em] font-[500] text-[14px] sm:text-[16px]">
//                   believe in our service
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col items-center sm:items-start">
//               <div className="relative w-[50px] h-[50px]">
//                 <Image
//                   src="/landingPage/properties.png"
//                   alt="Icon for properties"
//                   width={50}
//                   height={50}
//                   style={{ objectFit: "contain" }}
//                   priority
//                 />
//               </div>
//               <div className="mt-4 text-center sm:text-left">
//                 <div className="text-[#785DBA] font-plus-jakarta leading-[110%] tracking-[-0.01em] font-[700] text-[20px] sm:text-[24px]">
//                   10k+ properties
//                 </div>
//                 <div className="font-plus-jakarta text-[#000929] leading-[110%] tracking-[-0.01em] font-[500] text-[14px] sm:text-[16px]">
//                   under our management
//                 </div>
//               </div>
//             </div>
//           </section> */}

//           {isNotDesktop && (
//             <div className="flex mt-10 gap-6 flex-row md:flex-row">
//               <div>
//                 <Link href="/login" className="w-full md:w-auto">
//                   <WhiteButton title="Client Login" />
//                 </Link>
//               </div>
//               {/* <div className="md:mt-0">
//                 <Link href="/signup" className="w-full md:w-auto">
//                   <ColouredButton title="Sign up" />
//                 </Link>
//               </div> */}
//             </div>
//           )}
//         </div>

//         <section className="hidden md:block md:w-1/2 min-h-screen md:overflow-y-auto">
//           <div className="relative w-full h-full">
//             <Image
//               src="/landingPage/landing-image.png"
//               alt="Panda background"
//               fill
//               style={{ objectFit: "cover", objectPosition: "center" }}
//               priority
//             />
//           </div>
//         </section>
//       </div>
//       <Footer />
//     </div>
//   );
// }
