const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const paymentController = require('../controller/order/paymentController')
const webhooks = require('../controller/order/webhook')
const orderController = require('../controller/order/orderController')
const allOrderController = require('../controller/order/allOrderController')
const UploadBnnerProductController = require('../controller/product/uploadBanner')
const getBannerProductController = require('../controller/product/getbanner')
const updateBannerProductController = require('../controller/product/updateBanner')


router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-detailes",authToken, userDetailsController)
router.get("/userLogout", userLogout);
//admin panel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)
//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)



//add to cart section

router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)
router.post("/checkout",authToken,paymentController)
//api/webhook
router.post("/webhook",webhooks)
router.get("/order-list",authToken,orderController)
router.get("/all-order",authToken,allOrderController)

//upload banner
router.post("/banner-product",authToken,UploadBnnerProductController);
router.get("/get-banner",getBannerProductController)
router.post("/update-banner",authToken,updateBannerProductController)


module.exports = router 