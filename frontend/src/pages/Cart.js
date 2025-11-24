import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayPKRCurrency from '../helpers/displayCurrency'
import { MdDeleteSweep } from "react-icons/md";
import { current } from '@reduxjs/toolkit';
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async () => {
        
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },

        })
        
        const responseData = await response.json()
        if (responseData.success) {
            setData(responseData.data)
        }
    }
    const handleLoading=async()=>{
       await fetchData()

    }
    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])
    const increarseQty= async(id, qty)=>{
        const response=await fetch(SummaryApi.updateCartProduct.url,{
            method: SummaryApi.updateCartProduct.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(
                {
                    _id :id,
                    quantity: qty + 1
    
                }
            )
        })
        const responseData=await response.json()

        if(responseData.success){
            fetchData()
        }


    }
    const decreaseQty= async(id, qty)=>{
      if(qty >= 2){
        const response=await fetch(SummaryApi.updateCartProduct.url,{
            method: SummaryApi.updateCartProduct.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(
                {
                    _id:id,
                    quantity: qty - 1
    
                }
            )
        })
        const responseData=await response.json()

        if(responseData.success){
            fetchData()
        }
      }


    }
    const deleteCartProduct=async(id)=>{
        const response=await fetch(SummaryApi.deleteCartProduct.url,{
            method: SummaryApi.deleteCartProduct.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(
                {
                    _id:id,
                    
    
                }
            )
        })
        const responseData=await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }

    }
    const hanlePayment=async()=>{

        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

        const response=await fetch(SummaryApi.payment.url,{
            method:SummaryApi.payment.method,
            credentials:'include',
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify({
                cartItems : data
            })

        })
        const responseData=await response.json()
        if(responseData?.id){
            stripePromise.redirectToCheckout({sessionId:responseData.id})

        }
        console.log("responsdata",responseData)
    }
    const totalQty=data.reduce((previousValue, currentValue)=>previousValue+currentValue.quantity,0)

    const totalPrice=data.reduce((preve, curr)=>preve+ (curr.quantity * curr?.productId?.sellingPrice) ,0)
    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-green-800 text-white py-3'>No Order is Availabe</p>

                    )
                }
            </div>
            <div className='flex flex-col lg:flex-row gap-12 lg:justify-between p-4'>
                {/**You can see data by 0318-Sk */}
            <div className='w-full max-w-3xl'>
                {
                    loading ? (
                        loadingCart.map((el,index) => {
                            return (
                                <div key={el + "Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                </div>

                            )
                        })



                    ) : (
                        data.map((product,index)=>{
                            return(
                                <div key={product?._id + "Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-200 overflow-hidden'>
                                        <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>
                                    </div>
                                    <div className='px-4 py-2 gap-1 relative'>
                                        {/**Delete if you are not happy*/}
                                        <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                            <MdDeleteSweep/>
                                        </div>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capialize text-slate-500 '>{product?.productId?.category}</p>
                                        <div className='flex items-center justify-between'>
                                        <p className='text-green-800 font-medium text-lg'>{displayPKRCurrency(product?.productId?.sellingPrice)}</p>
                                        <p className='text-slate-600 font-semibold text-lg'>{displayPKRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                        </div>    
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button className='border border-red-600 text-red-600 h-6 w-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                            <span>{product?.quantity}</span>
                                            <button className=' border border-red-600 text-red-600 h-6 w-6 flex justify-center items-center rounded hover:bg-green-800 hover:text-white' onClick={()=>increarseQty(product?._id,product?.quantity)}>+</button>
                                        </div>    
                                    </div>    
                                </div>
                            )

                        })
                    )
                }
            </div>
            {/**Summary of all products */}
            {
                data[0] && (
                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                {
                    loading ? (
                        <div className='h-36 bg-slate-200 border-slate-300 animate-pulse'>
                            
                        </div>

                    ) : (
                        <div className='h-36 bg-white flex flex-col justify-between'>
                            <h2 className='text-white bg-green-800 px-4 py-1'>Summary</h2>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-600'>
                                <p>Quantity</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-600'>
                                <p>Total Price</p>
                                <p>{displayPKRCurrency(totalPrice)}</p>
                            </div>
                            <button className='bg-green-800 p-2 text-white w-full ' onClick={hanlePayment}>Payment</button>    
                        </div>

                    )
                }

                    </div>

                )
            }
            
            </div>

        </div>
    )
}

export default Cart