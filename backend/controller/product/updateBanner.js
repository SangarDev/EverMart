const uploadProductPermission = require('../../helpers/permission')
const bannerModel = require('../../models/bannerModel')

async function updateBannerProductController(req, res) {
    
    try{
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permissin denied")
        }
        const {_id, ...resBody}=req.body
        const updateProduct= await bannerModel.findByIdAndUpdate(_id,resBody)
        res.json({
            message:"Product Updated Successfully!",
            data:updateProduct,
            success:true,
            error: false
        })


    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports = updateBannerProductController