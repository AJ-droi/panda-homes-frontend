"use client"
import BackButton from '@/components/Backbutton';
import { PropertyFormStar } from '@/layout/svgIconPaths';
import dynamic from 'next/dynamic';

// const PropertyFormStar = dynamic(() => import('@/layout/svgIconPaths'), { 
//   ssr: false 
// });

const PropertyForm = dynamic(() => import('@/components/dashboard/Properties/PropertyForm'), { 
  ssr: false 
});

const page = () => {
  return (
    <section className="bg-[#fafafe] min-h-screen p-4 sm:p-6 md:p-8">

       <BackButton />
       
      <div className="mb-4">
        <PropertyFormStar />
      </div>
      <PropertyForm />
    </section>
  );
}

export default page;
