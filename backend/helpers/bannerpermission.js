const userModel = require("../models/userModel")

const uploadBannerProductPermission = async(userId)=>{
    const user =await userModel.findById(userId)
    if(user.role !== 'ADMIN'){
        return false
    }
    return false
}
module.exports = uploadBannerProductPermission