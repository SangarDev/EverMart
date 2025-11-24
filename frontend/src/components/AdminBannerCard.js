import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import AdminBannerEdit from "./AdminBannerEdit";
import displayPKRCurrency from "../helpers/displayCurrency";

const AdminBannerProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="relative bg-white p-5 rounded-lg shadow-lg flex flex-col items-center w-[1400px] h-[550px]">
      {/* Product Image */}
      <div className="w-[1400px] h-[400px] flex justify-center items-center">
        <img
          src={data?.productImage[0]}
          alt={data?.productName}
          className="object-contain w-full h-full rounded-lg"
        />
      </div>

      {/* Product Info - Positioned at the bottom-left */}
      <div className="absolute bottom-4 left-4 w-full px-6 p-5">
        <h1 className="text-xl font-semibold text-gray-800 line-clamp-2">
          {data.productName}
        </h1>
        <p className="text-lg font-medium text-gray-600">
          {displayPKRCurrency(data.sellingPrice)}
        </p>
      </div>

      {/* Edit Button - Perfect Circle */}
      <div
        className="absolute bottom-4 right-4 bg-green-800 hover:bg-green-600 text-white w-12 h-12 rounded-full cursor-pointer z-10 flex items-center justify-center shadow-lg"
        onClick={() => setEditProduct(true)}
      >
        <FaEdit size={20} />
      </div>

      {/* Overlay - Dim the rest of the page */}
      {editProduct && (
        <>
          {/* Dim Background */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setEditProduct(false)} // Close modal on background click
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 flex justify-center items-center z-40">
            <div className="bg-white p-8 rounded-lg shadow-lg z-50">
              <AdminBannerEdit
                productData={data}
                onClose={() => setEditProduct(false)}
                fetchdata={fetchdata}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminBannerProductCard;
