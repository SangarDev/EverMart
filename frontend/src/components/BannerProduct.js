import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/1.webp'
import image2 from '../assest/banner/2.webp'
import image3 from '../assest/banner/3.webp'
import image4 from '../assest/banner/4.webp'
import image5 from '../assest/banner/5.webp'
import image6 from '../assest/banner/6.webp'
import image7 from '../assest/banner/7.webp'
import image8 from '../assest/banner/8.webp'
import image9 from '../assest/banner/9.webp'
import image10 from '../assest/banner/10.webp'

import { TfiAngleDoubleLeft } from "react-icons/tfi";
import { TfiAngleDoubleRight } from "react-icons/tfi";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        image9,
        image10

    ]
    const nextImages = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1)

        }


    }
    const preveImages = () => {
        if (currentImage != 0) {
            setCurrentImage(preve => preve - 1)

        }


    }
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length -1> currentImage){
                nextImages()
            }else{
                setCurrentImage(0)
            }

        },3000)
        return()=>clearInterval(interval)

    },[currentImage])

    return (
        <div className='container mx-auto px-4 rounded mt-2'>
            <div className='h-60 md:h-96 w-full bg-slate-200 relative'>
                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex justify-between  w-full text-4xl'>
                        <button onClick={preveImages} className='bg-green-800 text-white shadow-md rounded-full p-1 hover:scale-110'>
                            <TfiAngleDoubleLeft />
                        </button>
                        <button onClick={nextImages} className='bg-green-800 text-white shadow-md rounded-full p-1 hover:scale-110'>
                            <TfiAngleDoubleRight />
                        </button>
                    </div>

                </div>
                {/**for desk and tablet*/}
                <div className='flex h-full w-full overflow-hidden'>
                    {
                        desktopImages.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURL} className='w-full h-full min-w-full min-h-full' />  {/* Added alt text for accessibility */}

                                </div>

                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}

export default BannerProduct;
