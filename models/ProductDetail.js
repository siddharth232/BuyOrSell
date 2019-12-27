var mongoose=require('mongoose');
var schema=mongoose.Schema;
var ProductDetail=new schema(
    {
        model: String,
        brand:String,
        DateofPurchase:Date,
        Bill:String,
        ImageUrl:String,
        category:String,
        subcategory:String,
        username:String,
        _id:String
    },{
        _id: false
    }
);
module.exports=mongoose.model('ProductDetail',ProductDetail,'ProductDetail')