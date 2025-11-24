const mongoose=require('mongoose')
const bannerSchema=mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    discription: String,
    price: Number,
    sellingPrice: Number
},{
    timestamps:true
})

const bannerModel = mongoose.model("bannerproduct",bannerSchema)

module.exports = bannerModel