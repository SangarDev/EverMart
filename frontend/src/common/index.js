// Correct backend domain without the '/api/signup' part
const backendDomain = "http://localhost:8080";

// Correct URL for the signup API
const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/signup`, // Corrected URL
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"

    },
    current_user: {
        url: `${backendDomain}/api/user-detailes`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: 'post'

    },
    uploadBanner: {
        url: `${backendDomain}/api/banner-product`,
        method: 'post'

    },
    allBanners:{
        url: `${backendDomain}/api/get-banner`,
        method: 'get'

    },
    updateBanner:{
        url: `${backendDomain}/api/update-banner`,
        method: 'post'

    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: 'get'

    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: 'post'
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: 'get'

    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: 'post'

    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "post"

    },
    addToCartProductCount: {
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: "get"

    },
    addToCartProductView: {
        url: `${backendDomain}/api/view-card-product`,
        method: "get"

    },
    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,
        method: "post"

    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: "post"

    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: "post"


    },

    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: "post"
    },

    payment:{
        url: `${backendDomain}/api/checkout`,
        method: "post"
    },
    getOrder:{
        url: `${backendDomain}/api/order-list`,
        method: "get"
    },
    allOrder:{
        url: `${backendDomain}/api/all-order`,
        method: "get"
    }






}

export default SummaryApi; 
