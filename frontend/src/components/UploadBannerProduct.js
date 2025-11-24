import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { MdCloudUpload } from "react-icons/md";
import uploadImage from "../helpers/uploadImage";
import DisplayBannerImage from "./DisplayBannerImage";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import SummaryApi from "../common";

const UploadBannerProduct =  ({
  onClose,
  fetchData
}) => {
  const [data, setData] = useState({
      productName: "",
      brandName: "",
      category: "",
      productImage: [],
      discription: "",
      price: "",
      sellingPrice: ""
  })
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")
  //const [uploadProductImageInput, setUpUploadImageInput] = useState("")


  const handleOnChange = (e) => {
      const {name,value}=e.target
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
  {/**upload product */}
  const handleSubmit= async(e)=>{
      e.preventDefault()
      //console.log("data",data)
      const response=await fetch(SummaryApi.uploadBanner.url,{
          method:SummaryApi.uploadBanner.method,
          credentials:'include',
          headers :{
              "content-type" : "application/json"

          },
          body: JSON.stringify(data)
      })
      const responseData=await response.json()
      if(responseData.success){
          toast.success(responseData?.message)
          onClose()
          fetchData()
          
      }
      if(responseData.error){
          toast.error(responseData?.message)
          
      }

  }

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-[90%] h-[84%] overflow-hidden">
        {/* Header */}
        <div className="bg-green-800 text-white flex justify-between items-center p-2 rounded">
          <h2 className="font-bold text-lg">Upload Product For Banner</h2>
          <button
            className="text-2xl hover:bg-red-600 hover:text-white rounded-full p-2"
            onClick={onClose}
          >
            <IoMdClose />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex gap-4 mt-4 h-[85%]">
          {/* Left Section: Image Upload */}
          <div className="w-[900px] flex flex-col items-center gap-3 border-r pr-4 overflow-y-auto bg-slate-100">
            <label htmlFor="uploadImageInput" className="cursor-pointer">
              <div className="p-2 bg-white border rounded h-30 w-full flex flex-col justify-center items-center gap-2">
                <MdCloudUpload className="text-3xl text-slate-500" />
                <p className="text-lg text-slate-500">Upload image for banner</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  accept=".jpg, .jpeg, .webp"
                  className="hidden"
                  onChange={handleUploadProduct}
                  required
                />
              </div>
            </label>

            <div>
              {data.productImage.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {data.productImage.map((el, index) => (
                    <div className="relative group" key={index}>
                      <img
                        src={el}
                        alt={`product-${index}`}
                        width={700}
                        height={400}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        className="absolute bottom-2 right-3 p-3 text-2xl text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handlDeleteProductImage(index)}
                      >
                        <MdDeleteForever />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-green-800 text-lg font-bold">
                  Upload product image here!
                </p>
              )}
            </div>
          </div>

          {/* Right Section: Form */}
          <div className="w-[900px] flex flex-col gap-4 overflow-y-auto">
            <label htmlFor="productName" className="block font-medium">
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Enter the product name"
              value={data.productName}
              onChange={handleOnChange}
              className="p-2 w-full bg-slate-200 border rounded"
              required
            />

            <label htmlFor="brandName" className="block font-medium">
              Brand Name:
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              placeholder="Enter the brand name"
              value={data.brandName}
              onChange={handleOnChange}
              className="p-2 w-full bg-slate-200 border rounded"
              required
            />

            <label htmlFor="category" className="block font-medium">
              Category:
            </label>
            <select
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="p-2 w-full bg-slate-200 border rounded"
            >
              <option value="">Select Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={index}>
                  {el.label}
                </option>
              ))}
            </select>

            <label htmlFor="price" className="block font-medium">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter the price"
              value={data.price}
              onChange={handleOnChange}
              className="p-2 w-full bg-slate-200 border rounded"
              required
            />

            <label htmlFor="sellingPrice" className="block font-medium">
              Selling Price:
            </label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              placeholder="Enter the selling price"
              value={data.sellingPrice}
              onChange={handleOnChange}
              className="p-2 w-full bg-slate-200 border rounded"
              required
            />

            <label htmlFor="discription" className="mt-3 block font-medium">
              Description:
            </label>
            <textarea
              className="min-h-[100px] bg-slate-200 border resize-none p-1"
              rows={6}
              placeholder="Enter the product description"
              onChange={handleOnChange}
              name="discription"
              value={data.discription}
              required
            ></textarea>

            <button
              type="submit"
              className="mt-auto px-4 py-2 rounded-full bg-green-800 text-white hover:bg-green-600"
            >
              Upload Product
            </button>
          </div>
        </form>

        {/* Fullscreen Image Viewer */}
        {openFullScreenImage && (
          <DisplayBannerImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage}
          />
        )}
      </div>
    </div>
  );
};

export default UploadBannerProduct;
