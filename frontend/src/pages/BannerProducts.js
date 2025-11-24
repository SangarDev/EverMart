import React, { useEffect, useState } from "react";
import UploadBannerProduct from "../components/UploadBannerProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import AdminBannerProductCard from "../components/AdminBannerCard";

const BannerProducts = () => {
  const [openUploadBannerProduct, setOpenUploadBannerProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allBanners.url);
    const dataResponse = await response.json();
    console.log("Product data", dataResponse);
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
    console.log("Fetched Products:", allProduct);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="bg-green-800 py-2 px-4 text-white flex justify-between items-center ">
        <h2 className="font-bold text-xl">Banner All Products</h2>
        <button
          className="border-2 border-green-600 text-black bg-white py-1 px-3 hover:text-green-600 transition-all hover:scale-110 rounded-full"
          onClick={() => setOpenUploadBannerProduct(true)}
        >
          Upload Products
        </button>
      </div>

      {/* Conditional Rendering: Only show the product cards if not uploading */}
      {!openUploadBannerProduct && (
        <div className="flex items-center flex-wrap gap-8 py-4 rounded h-[calc(100vh-150px)] overflow-y-scroll">
          {allProduct.map((product, index) => (
            <div key={index} className="shadow-lg rounded-lg p-4">
              <AdminBannerProductCard
                data={product}
                key={index + "allProduct"}
                fetchData={fetchAllProduct}
                variant="banner" // Pass the variant prop
              />
            </div>
          ))}
        </div>
      )}

      {/* Show UploadBannerProduct when openUploadBannerProduct is true */}
      {openUploadBannerProduct && (
        <UploadBannerProduct
          onClose={() => setOpenUploadBannerProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default BannerProducts;
