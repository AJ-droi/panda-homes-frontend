import React from 'react'
import Image from 'next/image'

const layout = ({
  children,
}: {
  children: React.ReactNode;
}) =>{
  return (
    <div>
         <div className="flex min-h-screen justify-between w-full pr-[10%]">
        <div className="flex flex-col justify-between items-start min-h-screen w-[50%] py-[2%] px-[2%]">
          <Image src="/panda-white.svg" alt="" width={100} height={100} />
          <h3 className="font-plus-jarkarta text-left text-[35px] text-[#fff]">
            One Platform. <br /> Endless Possibilities.
          </h3>

          <p> You can reach use at pandaadmin@gmail.com </p>
        </div>
         <main className="flex items-end min-h-screen w-[40%]">
            {children}
         </main>

    </div>
    </div>
    )
}

export default layout