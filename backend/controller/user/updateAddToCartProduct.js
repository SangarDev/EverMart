const addToCartModel = require("../../models/cartProduct")
const productModel = require("../../models/productModel")

const updateAddToCartProduct=async(req, res)=>{
    try{
        const currentUserId=req.userId

        const addToCartproductId=req?.body?._id

        const qty=req.body.quantity

        const updateProduct=await addToCartModel.updateOne({_id :addToCartproductId},{
            ...(qty && {quantity:qty})
        })
        res.json({
            message:"Product Updated Successfully!😊",
            data: updateProduct,
            error:false,
            success:true
        })

    }catch(err){
        res.json({
            message: err?.message || err,
            error:true,
            success: false

        })
    }
}
module.exports = updateAddToCartProduct