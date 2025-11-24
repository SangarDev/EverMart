import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayPKRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    discription: "",
    price: "",
    sellingPrice: ""
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(6).fill(null); // Adjusted for 6 images
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordiante]=useState({
    x:0,
    y:0
  })
  const [zoomImage,setZoomImage]=useState(false)
  const {fetchUserAddToCart} = useContext(Context)

  const navigate=useNavigate()

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  useEffect(() => {
    fetchProductDetails();
    
  }, [params]);

  const handleZoomImage=useCallback((e)=>{
    setZoomImage(true)
    const {left, top, width, height}=e.target.getBoundingClientRect()
    console.log("coordinate",left,top, width, height)
    const x =(e.clientX-left)/width
    const y =(e.clientY-top)/height
    setZoomImageCoordiante({
      x,
      y
    })
    

  },[zoomImageCoordinate])
   const handleLeaveImageZoom=()=>{
    setZoomImage(false)
   }
   const handleAddToCart= async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()


   }
   const handleBuyProduct=async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")

   }
  

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4 md:gap-2">
        {/** Product image section */}
        <div className="h-[400px] flex flex-col lg:flex-row-reverse gap-4 md:gap-6">
          {/* Active image */}
          <div className="h-[350px] w-[350px] lg:h-[410px] lg:w-[410px] bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply" onMouseMove={handleZoomImage}
              alt="Active Product" onMouseLeave={handleLeaveImageZoom}
            />
            {/** Zoom the image or active image*/}
            {
              zoomImage &&(
                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                <div
                className='w-full h-full min-h-[400px] min-w-[500px]  mix-blend-multiply scale-125'
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundRepeat:'no-repeat',
                  backgroundPosition:  `${zoomImageCoordinate.x*100}% ${zoomImageCoordinate.y*100}%`
                }} >
  
                </div>
  
  
              </div>

              )
            }
           
          </div>

          {/* Small images */}
          <div className="h-full flex flex-col items-center justify-center">
            {loading ? (
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 h-full overflow-auto">
                {productImageListLoading.map((_, index) => (
                  <div
                    className="h-24 w-24 bg-slate-200 rounded animate-pulse"
                    key={`loadingImage-${index}`}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 h-full overflow-auto">
                {data?.productImage?.map((imgURL, index) => (
                  <div
                    className="h-24 w-24 lg:h-28 lg:w-28 bg-slate-200 rounded p-1"
                    key={imgURL}
                  >
                    <img
                      src={imgURL}
                      className="w-full h-full object-cover mix-blend-multiply cursor-pointer"
                      alt={`Product Thumbnail ${index + 1}`}
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/** Product details */}
        {
          loading?(
            <div className='grid gap-1 w-full'>
          <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
          <h2 className='text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse  w-full lg:h-8'></h2>
          <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6  w-full lg:h-8'></p>
          <div className='text-yellow-600 flex items-center gap-1 bg-slate-200 h-6 lg:h-8 animate-pulse  w-full'>
        

          </div>
          <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl h-6 animate-pulse  w-full'>
            <p className='text-green-800 bg-slate-200  w-full'></p>
            <p className='text-red-800  line-through bg-slate-200 w-full'></p>
          </div>
          <div className='flex items-center gap-3 my-2  w-full'>
            <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse  w-full'></button>
            <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse  w-full'></button>
            
          </div>
          <div className=' w-full'>
              <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse  w-full'> </p>
              <p className='h-10 lg:h-12 bg-slate-200 rounded animate-pulse  w-full'></p>
              
            </div>
            </div>
          ):(
            <div className='flex flex-col gap-1'>
          <p className="bg-green-800 text-white px-2 rounded-full inline-block w-fit ">
            {data?.brandName}
          </p>
          <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
          <p className='capitalize text-slate-400'>{data?.category}</p>
          <div className='text-yellow-600 flex items-center gap-1'>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalf />

          </div>
          <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl'>
            <p className='text-green-800'>{displayPKRCurrency(data.sellingPrice)}</p>
            <p className='text-red-800  line-through'>{displayPKRCurrency(data.price)}</p>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <button className='border-2 rounded border-green-800 px-3 py-1 min-w-[120px] text-green-800 font-medium hover:bg-green-800 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)} >Buy</button>
            <button className='border-2 rounded border-red-800 px-3 py-1 min-w-[120px] font-medium text-white bg-red-800 hover:text-red-800 hover:bg-white' onClick={(e)=>handleAddToCart(e,data?._id)}>Add to Cart</button>
            
          </div>
          <div>
              <p className='text-slate-600 font-medium my-1'>Description: </p>
              <p>{data?.discription}</p>
              
            </div>
            </div>
          )
        }
      </div>
      {
        data.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Products"}/>

        )
      }
    
    </div>
  );
};

export default ProductDetails;
