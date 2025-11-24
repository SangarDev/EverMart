import React from 'react'
import { IoMdClose } from 'react-icons/io'

const DisplayBannerImage = ({
    imgUrl,
    onClose
}) => {
    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center'>

            <div className='bg-white shadow-lg rounded max-w-8xl mx-auto'>
                <div className='w-fit ml-auto text-2xl hover:bg-red-600 hover:text-white hover:scale-110 cursor-pointer p-3' onClick={onClose}>
                    <IoMdClose />
                </div>
                <div
                    className="flex justify-center p-5"
                    style={{
                        width: '1500px',  // Increased width
                        height: '600px'  // Increased height
                    }}
                >
                    <img
                        src={imgUrl}
                        className="w-full h-full"
                        style={{
                            objectFit: 'cover' // Ensures the image fills the area proportionally
                        }}
                    />
                </div>


            </div>

        </div>

    )
}

export default DisplayBannerImage