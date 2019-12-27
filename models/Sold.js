var mongoose=require('mongoose');
var schema=mongoose.Schema;
var SoldDetail=new schema(
    {
        Seller:String,
        brand:String,
        model:String,
        ImageUrl:String,
        category:String,
        subcategory:String,
        DateofPurchase:String,
        Bill:String,
        _id:String,
        Buyer:String
},{
    _id:false
}
);

module.exports=mongoose.model('SoldDetail',SoldDetail,'SoldDetails');