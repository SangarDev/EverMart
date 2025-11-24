import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()
    console.log("product data", dataResponse)
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
    console.log("Fetched Products:", allProduct); // Check the data here
}, []);


  return (
    <div>
      <div className="bg-green-800 py-2 px-4 text-white flex justify-between items-center">
        <h2 className="font-bold text-balance">All Products</h2>
        <button
          className="border-2 border-green-600 text-black bg-white py-1 px-3 
          hover:text-green-600 transition-all hover:scale-110 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Products
        </button>
      </div>

      {/*all product  */}
      <div className="flex items-center flex-wrap gap-5 py-4 rounded h-[calc(100vh-190px)] overflow-y-scroll ">

        {
        allProduct.map((product, index) => {
          return (
            <div key={index}>
              
              <AdminProductCard data={product} key={index+"allProduct"} 
              fetchdata={fetchAllProduct} />
            </div>
          );
        })}
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} 
        fetchData ={fetchAllProduct} />
      )}
    </div>
  );
};

export default AllProducts;
