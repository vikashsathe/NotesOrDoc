import React from 'react'
import { motion } from "motion/react"

const Card = () => {
  return (
    <motion.div drag className='h-[350px] w-[300px] bg-zinc-700 overflow-hidden px-5 py-5'>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, corporis.</p>
    </motion.div>
  )
}

export default Card