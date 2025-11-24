import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(20).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading ? (
          categoryLoading.map((el, index) => (
            <div
              className="h-20 w-20 md:w-28 md:h-28 rounded overflow-hidden bg-slate-200 animate-pulse"
              key={"categoryLoading" + index}
            ></div>
          ))
        ) : (
          categoryProduct.map((product, index) => (
            <Link
              to={"/product-category?category=" + product?.category}
              className="cursor-pointer"
              key={product?.category}
            >
              <div className="w-20 h-20 md:w-28 md:h-28 rounded overflow-hidden  border-none bg-transparent p-4 flex items-center justify-center">
                <img
                  src={product?.productImage[0]}
                  alt={product?.category}
                  className="h-full object-contain hover:scale-150 bg-transparent transition-all"
                />
              </div>
              <p className="text-center text-sm md:text-base capitalize">{product?.category}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
