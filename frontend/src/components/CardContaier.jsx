import React from 'react'
import Card from './Card'

const CardContaier = () => {
    const CardDate = [
        {
            "disc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates officiis dignissimos natus architecto quibusdam quaerat."
        }
    ]
  return (
    <div className='absolute top-0 w-full h-screen flex justify-center items-center'>
        <div className='p-5 gap-5 flex justify-center items-center flex-wrap max-h-full overflow-scroll'>

        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        </div>
        
    </div>
  )
}

export default CardContaier