'use client';
import Link from 'next/link';
import ColouredButton from '@/components/ColouredButton';
import WhiteButton from '@/components/WhiteButton';
import Image from "next/image";

//fixed top-0 left-0

const Navbar = () => {

  return (
    <nav className=" w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
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
      <div className="flex gap-4">
        <Link href="/login">
        <WhiteButton title='Login' />
        </Link>
        <Link href="/sign-in">
        <ColouredButton title='Sign up' />
        </Link>
      </div>
    </nav>
  );

}

export default Navbar;