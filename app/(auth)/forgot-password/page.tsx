import ForgotForm from '@/components/ForgotForm'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotForm />
    </Suspense>
  )
}

export default page
