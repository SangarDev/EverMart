import React from 'react'
import CancelImage from '../assest/cancel.gif'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='bg-white rounded w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2'>
      <img src={CancelImage} width={400} height={400} className='mix-blend-multiply'/>
      <p className='text-red-800 font-bold text-xl'>Payment Cancelled</p>
      <Link
        to={'/cart'}
        className="p-3 mt-6 rounded-lg font-semibold text-red-800 border-4 border-red-800 px-6 hover:bg-red-800
         hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
        Go to cart
      </Link>

    </div>
  )
}

export default Cancel