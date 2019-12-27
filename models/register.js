var mongoose=require('mongoose');
var schema=mongoose.Schema;
var RegisterSchema= new schema(
    {
        username:String,
        password:String,
        address:String,
        cart:String,
        mobile:String
    }
);
module.exports=mongoose.model('Register',RegisterSchema,'Register');