import AddTenantForm from '@/components/dashboard/Tenants/AddTenantForm'
import React from 'react'

const AddTenant = () => {
  return (
    <section className="bg-[#fafafe] min-h-screen p-4 sm:p-6 md:p-8">
        <div className=''>
    {/* <div className="mb-4">
      <PropertyFormStar />
    </div> */}
    <div className=''>
    <AddTenantForm  />
    </div>
        </div>
  </section>
  )
}

export default AddTenant