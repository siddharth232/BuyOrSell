var mongoose=require('mongoose');
var schema=mongoose.Schema;
var CartDetails=new schema(
    {
        model:String,
        brand:String,
        DateofPurchase:Date,
        Bill:String,
        ImageUrl:String,
        category:String,
        subcategory:String,
        username:String,
        _id:String
    }
);
module.exports=mongoose.model('CartDetails',CartDetails,'Cart')