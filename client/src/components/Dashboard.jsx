import React from 'react'
import food_bg from '../assets/food_bg.jpg' // adjust the path if needed
import Navbar from './Navbar'

const Dashboard = () => {
  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <Navbar />
      <img src={food_bg} alt="Food background" className='absolute w-full h-full object-cover' />
      <div className='absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm scale-105' />
      <div className='relative z-10 flex flex-col items-center justify-center w-full h-full'>
        <h1 className='text-white text-4xl m-2 font-bold'>Food Zone</h1>
        <p className='text-white text-2xl'>Discover best foods & restaurants</p>
      </div>
    </div>
  )
}

export default Dashboard
