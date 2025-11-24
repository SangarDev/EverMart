import React from 'react'
import { IoMdClose } from 'react-icons/io'

const DisplayImage = ({
  imagUrl,
  onClose
}) => {
  return (
    <div className='fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center'>
      <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
        <div className='w-fit ml-auto text-2xl hover:bg-red-600 hover:text-white 
                            hover:scale-110 cursor-pointer' onClick={onClose}>
          <IoMdClose/>
        </div>

        <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
          <img src={imagUrl} className='w-full h-full' />
        </div>
      </div>
    </div>
  )
}

export default DisplayImage