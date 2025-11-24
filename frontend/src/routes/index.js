import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../pages/Home'; 
import Login from "../pages/Login";
import Forgot from "../pages/Forgot";
import Signup from "../pages/Signup";
import AdmanPanel from "../pages/AdmanPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import AllOrders from "../pages/AllOrders";
import Ceremony from "../pages/Ceremony";
import Giftcermonony from "../pages/Giftcermonony";
import BannerProducts from "../pages/BannerProducts";
const router= createBrowserRouter ([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>

            },
            { 
                path:"ceremony",
                element:<Ceremony/>
            },
            {
                path:"gift",
                element:<Giftcermonony/>

            },
            
            {
                path :"login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <Forgot/>
            },
            {
                path :"sign-up",
                element : <Signup/>
            },
            {
                path:"product-category",
                element:<CategoryProduct/>
            },
            {
                path:"product/:id",
                element:<ProductDetails/>

            },
            {
                path: "cart",
                element:<Cart/>

            },
            {
                path:"success",
                element:<Success/>

            },
            {
                path:'cancel',
                element:<Cancel></Cancel>

            },
            {
                path: "search",
                element: <SearchProduct/>

            },
            {
                path:'order',
                element:<OrderPage/>
            },
            {
                path : "admin-panel",
                element : <AdmanPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path:"banner-products",
                        element:<BannerProducts/>

                    },
                    {
                        path:"all-orders",
                        element:<AllOrders/>
                    }
                ]

            },
            
        ]

    }
])
export default router