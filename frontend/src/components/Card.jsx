import React from 'react'
import { motion } from "motion/react"

const Card = () => {
  return (
    <motion.div drag className='h-[300px] w-[260px] relative bg-zinc-700 px-5 py-5 capitalize'>
        <div className='flex gap-38 justify-between text-3xl'><i class="ri-sticky-note-fill text-3xl"></i><i class="ri-close-line"></i></div>
        <h5 className='mt-3 text-xl'>title</h5>
        <h6 className='mt-2 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, eligendi.</h6>

<div className='absolute bottom-2 flex justify-between items-center gap-20'>
        <p>0.5 <span className='text-green-800'>MB</span></p>
        <p className=''>current Date</p>

        </div>
    </motion.div>
  )
}

export default Card