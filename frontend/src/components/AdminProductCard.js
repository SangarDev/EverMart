import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import AdminEditProduct from './AdminEditProduct';
import displayPKRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false);

    return (
        <div className="bg-white p-4 rounded w-48 h-72 flex flex-col">
            {/* Product Image */}
            <div className="w-40 h-40 flex justify-center items-center mx-auto">
                <img
                    src={data?.productImage[0]}
                    alt={data?.productName}
                    className="object-contain w-full h-full rounded transition-all ease-in-out hover:scale-110"
                />
            </div>

            {/* Product Name */}
            <h1 className="text-ellipsis line-clamp-2 text-center text-sm font-medium mt-2">
                {data.productName}
            </h1>

            {/* Product Price */}
            <div>
                <p className="font-semibold text-center mt-1">
                    {displayPKRCurrency(data.sellingPrice)}
                </p>
            </div>

            {/* Edit Button */}
            <div
                className="w-fit bg-green-100 ml-auto p-2 hover:bg-green-800 
                rounded-full hover:text-white cursor-pointer mt-auto"
                onClick={() => setEditProduct(true)}
            >
                <FaEdit />
            </div>

            {/* Edit Product Modal */}
            {editProduct && (
                <AdminEditProduct
                    productData={data}
                    onClose={() => setEditProduct(false)}
                    fetchdata={fetchdata}
                />
            )}
        </div>
    );
};

export default AdminProductCard;
