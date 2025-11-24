const uploadBannerProductPermission = require("../../helpers/bannerpermission")
const bannerModel = require("../../models/bannerModel")



async function UploadBnnerProductController(req, res) {
    try{
        const sessionUserId = req.userId
        if(!uploadBannerProductPermission(sessionUserId)){
            throw new Error("Permissin denied")
        }
        const uploadProduct= new bannerModel(req.body)
        const saveProduct=await uploadProduct.save()
        res.status(201).json({
            message: "Product Uploaded successfully!",
            error: false,
            success: true,
            data: saveProduct
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
    
}
module.exports = UploadBnnerProductController