import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import displayPKRCurrency from '../helpers/displayCurrency';
const AllOrders = () => {
    const [data, setData] = useState([]);

    const fetchOrderDetails = async () => {
      const response = await fetch(SummaryApi.allOrder.url, {
        method: SummaryApi.allOrder.method,
        credentials: 'include',
      });
      const responseData = await response.json();
      setData(responseData.data);
      console.log('Order List', responseData);
    };
  
    useEffect(() => {
      fetchOrderDetails();
    }, []);
  
    return (
      <div className="p-4 bg-gray-50 min-h-screen  h-[calc(100vh-190px)] overflow-y-scroll ">
        {!data[0] && (
          <p className="text-center text-gray-500 text-lg font-medium">
            No Orders Available
          </p>
        )}
        <div className="space-y-6 max-w-4xl mx-auto">
          {data.map((item, index) => (
            <div
              key={item.userId + index}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex flex-wrap">
                {/* Left Side: Product Details */}
                <div className="w-full lg:w-2/3">
                  <p className="text-sm text-gray-500">
                    Order Date: <span className="font-medium">{moment(item.createdAt).format('LLL')}</span>
                  </p>
                  <div className="mt-4 space-y-4">
                    {item?.productDetails.map((product, idx) => (
                      <div
                        key={product.productId + idx}
                        className="flex items-start space-x-4 border-b pb-4 last:border-none"
                      >
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="h-36 w-36 bg-gray-100 rounded-md object-contain"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {product.name}
                          </h3>
                          <p className="text-md text-gray-600 mt-1">
                            {displayPKRCurrency(product.price)}
                          </p>
                          <p className="text-md text-gray-600 mt-1">
                            Quantity: {product.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
  
                {/* Right Side: Payment, Delivery, and Total Details */}
                <div className="w-full lg:w-1/3 mt-6 lg:mt-0 pl-0 lg:pl-6">
                  <div className="space-y-4">
                    {/* Payment Details */}
                    <div>
                      <h4 className="text-md font-semibold text-gray-800">Payment Details:</h4>
                      <p className="text-md text-gray-600 mt-1">
                        Payment Method: <span className="font-medium">{item.paymentDetails.payment_method_type[0]}</span>
                      </p>
                      <p className="text-md text-gray-600">
                        Payment Status: <span className="font-medium">{item.paymentDetails.payment_status}</span>
                      </p>
                    </div>
  
                    {/* Delivery Details */}
                    <div>
                      <h4 className="text-md font-semibold text-gray-800">Delivery Details:</h4>
                      {item.shipping_options.map((shipping, idx) => (
                        <p key={shipping.shipping_rate} className="text-md text-gray-600 mt-1">
                          Delivery Amount: <span className="font-medium">{displayPKRCurrency(shipping.shipping_amount)}</span>
                        </p>
                      ))}
                    </div>
  
                    {/* Total Amount */}
                    <div>
                      <h4 className="text-md font-semibold text-gray-800">Total Amount:</h4>
                      <p className="text-lg font-bold text-gray-800 mt-1">
                        {displayPKRCurrency(item.totalAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default AllOrders