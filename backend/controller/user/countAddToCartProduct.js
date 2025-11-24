const addToCartModel=require("../..//models/cartProduct")
const countAddToCartProduct= async(req,res)=>{
    try{
        const userId = req.userId
        const count=await  addToCartModel.countDocuments({
            userId: userId
        })

        res.json({
            data : {
                count : count
            }
        })


    }catch(error){
        res.json({
            message: error.message || error,
            error:false,
            success:false,
        })

    }
}
module.exports = countAddToCartProduct