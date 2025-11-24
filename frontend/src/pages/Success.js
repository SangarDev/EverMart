import React from 'react'
import paymentImage from '../assest/payment.gif'
import {Link} from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-white rounded w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2'>
        <img src={paymentImage} width={500} height={600}/>
        <p className='text-green-800 font-bold text-xl'>Payment Added Sucessfully</p>
        <Link 
  to={'/order'} 
  className="p-3 mt-6 rounded-lg font-semibold text-green-800 border-4 border-green-800 px-6 hover:bg-green-800 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
>
  Check Order
</Link>

    </div>
  )
}

export default Success