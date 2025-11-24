import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayPKRCurrency from '../helpers/displayCurrency'
import { TfiAngleDoubleLeft, TfiAngleDoubleRight } from 'react-icons/tfi'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll]=useState(0)
    const scrollElement=useRef()

    const {fetchUserAddToCart} = useContext(Context)

    const handleAddToCart= async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()

    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)
    }
    useEffect(() => {
        fetchData()

    }, [])
    const scrollRight=()=>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft=()=>{
        scrollElement.current.scrollLeft -= 300
    }
    return (
        <div className='container mx-auto px-4 py-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            <div className='flex items-center gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

                <button className='bg-green-800 text-white shadow-md rounded-full p-1 hover:scale-110 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}>
                    <TfiAngleDoubleLeft />
                </button>
                <button className='bg-green-800 text-white shadow-md rounded-full p-1 hover:scale-110 absolute right-0 text-lg hidden md:block' onClick={scrollRight}>
                    <TfiAngleDoubleRight />
                </button>
                
                {
                    loading?(
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[320px] md:max-w-[320px] bg-white rounded-sm 
                                shadow-md h-36 flex'>
    
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                        
    
                                    </div>
                                    <div className='p-4 grid w-full gap-2'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded'></h2>
                                        <p className='capitalize text-slate-500 p-1 bg-slate-200  animate-pulse rounded'></p>
                                        <div className='flex gap-3 text-sm w-full '>
                                            <p className='text-green-800 font-medium p-1 bg-slate-200 w-full animate-pulse rounded'></p>
                                            <p className='text-red-600 line-through p-1 bg-slate-200 w-full animate-pulse rounded'></p>
                                        </div>
                                        <button className='text-sm text-white  px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
    
                                    </div>
                                </div>
    
                            )
                        })
                    ):(
                        data?.map((product, index) => {
                            return (
                                <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[320px] md:max-w-[320px] bg-white rounded-sm 
                                shadow-md h-36 flex'>
    
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                        <img src={product.productImage[0]} className='mix-blend-multiply object-scale-down h-full hover:scale-150 transition-all' />
    
                                    </div>
                                    <div className='p-4 grid'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex gap-3 text-sm '>
                                            <p className='text-green-800 font-medium'>{displayPKRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-red-600 line-through'>{displayPKRCurrency(product?.price)}</p>
                                        </div>
                                        <button className='text-sm bg-green-800 hover:bg-green-600 text-white  px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to card</button>
    
                                    </div>
                                </Link>
    
                            )
                        })

                    )
                  
                }
            </div>

        </div>
    )
}

export default HorizontalCardProduct