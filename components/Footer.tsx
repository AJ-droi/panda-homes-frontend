import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='px-4 sm:px-6 md:px-12 lg:px-[64px] py-10 md:py-[80px]'>
      <div className='flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 sm:gap-0'>
        <div className="w-[133px] h-[38px] hover:cursor-pointer">
          <Image
            src="/landingPage/logo.png"
            alt="Panda Logo"
            width={150}
            height={150}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <div className='flex gap-[12px] mt-6 sm:mt-0'>
          <div className="w-[24px] h-[24px] hover:cursor-pointer">
            <Image
              src="/footer/facebook.png"
              alt="Facebook"
              width={10}
              height={18}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <div className="w-[24px] h-[24px] hover:cursor-pointer">
            <Image
              src="/footer/instagram.png"
              alt="Instagram"
              width={18}
              height={18}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <div className="w-[24px] h-[24px] hover:cursor-pointer">
            <Image
              src="/footer/twitter.png"
              alt="Twitter"
              width={18}
              height={15.3}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <div className="w-[24px] h-[24px] hover:cursor-pointer">
            <Image
              src="/footer/linkedin.png"
              alt="LinkedIn"
              width={18}
              height={18}
              style={{ objectFit: "contain", color: '#66666659', fill: '#66666659', outlineColor: '#66666659' }}
              className='text-[#66666659]'
              priority
            />
          </div>
        </div>
      </div>
      <div className='mt-10 md:mt-[80px]'>
        <div className='bg-[#66666640] w-full h-0.5'></div>
      </div>
      <div className='flex justify-center items-center'>
        <div className='flex flex-col sm:flex-row justify-center items-center sm:items-start gap-4 sm:gap-[24px] w-full sm:w-auto mt-6 md:mt-10 text-center sm:text-left'>
          <div className='font-[400] text-[14px] text-[#000000]'>2024 panda. All right reserved.</div>
          <Link href='#' className='font-[400] text-[14px] underline text-[#000000]'>Privacy Policy</Link>
          <Link href='#' className='font-[400] text-[14px] underline text-[#000000]'>Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;