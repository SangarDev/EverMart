import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory';
import { MdCloudUpload } from "react-icons/md";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDeleteForever } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify'

const AdminEditProduct = ({
    onClose,
    productData,
    fetchdata

}) => {
    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        discription: productData?.discription,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")
    //const [uploadProductImageInput, setUpUploadImageInput] = useState("")
    const handleOnchange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value

            }
        })

    }
    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        //setUpUploadImageInput(file.name)
        //console.log("file", file)
        const uploadImageCloudinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]

            }
        })

        //console.log("upload Image", uploadImageCloudinary.url)
    }
    const handlDeleteProductImage = async (index) => {
        console.log("Image index", index)
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]

            }
        })
    }
    {/**upload product */ }
    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log("data",data)
        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"

            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()
        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchdata()

        }
        if (responseData.error) {
            toast.error(responseData?.message)

        }

    }

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0
         flex justify-center items-center '>
            <div className='bg-white p-4 rounded w-full h-full max-w-2xl max-h-[80%] overflow-hidden  '>
                <div className=' bg-green-800 rounded text-white flex justify-center items-center pb-3 p-2'>
                    <h2 className='font-bold text-lg'>Edit Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:bg-red-600 hover:text-white 
                    hover:scale-110 cursor-pointer' onClick={onClose}>
                        <IoMdClose />
                    </div>

                </div>
                <form className='grid p-4 gap-2 overflow-scroll h-full pb-5 ' onSubmit={handleSubmit}>
                    <label htmlFor='productName' >Product Name :</label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='enter the product name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnchange}
                        className='p-1 bg-slate-100 border rounded'
                        required
                    />
                    <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
                    <input
                        type='text'
                        id='brandName'
                        placeholder='enter the brand name'
                        value={data.brandName}
                        onChange={handleOnchange}
                        name='brandName'
                        className='p-1 bg-slate-100 border rounded'
                        required
                    />
                    <label htmlFor='category' className='mt-3'>Category :</label>
                    <select required value={data.category} name='category' onChange={handleOnchange} className='p-1 bg-slate-100 border rounded'>
                        <option value={""}>Select Category</option>
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border h-32 w-full flex justify-center items-center cursor-pointer'>

                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'>
                                    <MdCloudUpload />
                                </span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' id='uploadImageInput' className='hidden'
                                    onChange={handleUploadProduct} />
                            </div>


                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImage.map((el, index) => {
                                            return (
                                                <div className='relative group'>
                                                    <img src={el}
                                                        alt={el}
                                                        width={80}
                                                        height={80}
                                                        className='bg-slate-100 border cursor-pointer'
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullScreenImage(el)

                                                        }} />
                                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 
                                                    rounded-full hidden group-hover:block cursor-pointer' onClick={() => handlDeleteProductImage(index)}>
                                                        <MdDeleteForever />
                                                    </div>

                                                </div>

                                            )
                                        })
                                    }
                                </div>

                            ) : (
                                <p className='text-red-600 text-xs'>!please upload product image</p>
                            )
                        }

                    </div>
                    <label htmlFor='price' className='mt-3'>Price :</label>
                    <input
                        type='number'
                        id='price'
                        placeholder='enter the price'
                        value={data.price}
                        onChange={handleOnchange}
                        name='price'
                        className='p-1 bg-slate-100 border rounded'
                        required
                    />
                    <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
                    <input
                        type='number'
                        id='sellingPrice'
                        placeholder='enter the sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnchange}
                        name='sellingPrice'
                        className='p-1 bg-slate-100 border rounded'
                        required
                    />
                    <label htmlFor='discription' className='mt-3'>Discription :</label>
                    <textarea className='h-28 bg-slate-100 border  resize-none p-1'
                        rows={3}
                        placeholder='enter the product discription'
                        onChange={handleOnchange}
                        name='discription'
                        value={data.discription}
                        required
                    >

                    </textarea>

                    <button className='px-3 py-2 bg-green-900 text-white mb-10 hover:bg-green-600'>Update Product</button>

                </form>

            </div>
            {/**Display the image full screen */}
            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} 
                    imagUrl={fullScreenImage} />

                )
            }


        </div>
    )
}

export default AdminEditProduct