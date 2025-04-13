import PropertyForm from '@/components/dashboard/Properties/PropertyForm'
import { PropertyFormStar } from '@/layout/svgIconPaths'
import React from 'react'

const page = () => {
  return (
    <section className="bg-[#fafafe] min-h-screen p-4 sm:p-6 md:p-8">
    <div className="mb-4">
      <PropertyFormStar />
    </div>
    <PropertyForm  />
  </section>
  )
}

export default page