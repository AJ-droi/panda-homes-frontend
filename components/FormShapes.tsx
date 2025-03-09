import React from 'react';
import Image from "next/image";

const FormShapes = () => {
  return (
    <div className='bg-white'>
      <div className='flex gap-20 items-center'>
        <div>
        <Image
                src="/authPages/cone.png"
                alt="Panda Logo"
                width={154.36}
                height={154.36}
                style={{ objectFit: "contain" }}
                priority
              />
        </div>
        <div>
        <Image
                src="/authPages/ellipse.png"
                alt="Panda Logo"
                width={165}
                height={165}
                style={{ objectFit: "contain" }}
                priority
              />
        </div>
      </div>
      <div>
      <Image
                src="/authPages/cylinder.png"
                alt="Panda Logo"
                width={463}
                height={463}
                style={{ objectFit: "contain" }}
                priority
              />
      </div>
    </div>
  )
}


export default FormShapes;