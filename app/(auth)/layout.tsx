import React from "react";
import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row min-h-screen justify-between w-full">
        <div className="flex flex-col justify-between items-start md:min-h-screen md:w-[50%] py-[2%] px-[2%]">
        <Image src="/panda-white.svg" alt="" width={80} height={80} />
          <h3 className="font-plus-jarkarta text-left text-[25px] md:text-[35px] text-[#fff] py-[5%] md:py-[0%]">
            One Platform. <br /> Endless Possibilities.
          </h3>

       <p className="text-[12px]"> You can reach us at hello@getpanda.co </p>
        </div>
       <main className="flex  items-end md:min-h-screen mx-auto w-[100%] md:w-[45%] ">{children}</main>
      </div>
    </div>
  );
};

export default layout;
