const bannerModel = require("../../models/bannerModel")


const getBannerProductController= async(req,res)=>{
    try{
        const allProduct = await bannerModel.find().sort({createdAt: -1})
        res.json({
            message : "All Products",
            success : true,
            error : false,
            data: allProduct
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports = getBannerProductController