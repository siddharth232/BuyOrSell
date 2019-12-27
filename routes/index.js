var express = require('express');
var router = express.Router();
var register=require('../models/register');
var ProductDetail=require('../models/ProductDetail');
var SoldDetails=require('../models/Sold');
var CartDetails=require('../models/Cart');
var url=require('url');
var multer=require('multer');
var mongoose=require('mongoose');
var CartContent=[];
var CategoryContent=[];
var ProductContent=[];
var soldcontent=[];
var sellcontent=[];
var SoldListContent=[];
var Cart=[];
var fileUrl;
var Items;

var storage=multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'C:/Users/siddh/Desktop/project/public/images/Uploads');
  },
  filename: function(req,file,cb){
     cb(null,file.originalname);
     fileUrl=file.originalname;
  }
})
var fileFilter=function(req,file,cb){
  if(file.mimetype=='image/jpeg'||file.mimetype=='image/png'){
    cb(null,true);
  }else{
    cb(null,false);
  }
}
var upload=multer({storage: storage,
  fileFilter: fileFilter
 });



/* GET home page. */
router.post('/login',function(req,res,next){
 // res.send('assssss');
  register.findOne({username:req.body.username}).exec(function(err,docs){
    if(docs){
    if(err)
    res.send(err);
    else if(req.body.password==docs.password){
      req.session.username=req.body.username;
      res.redirect('/Home');
    }else{
     
      res.render('LogIn',{javascript:"Invalid Password "});
    }}
    else{
      res.render('LogIn',{javascript:"No Such User Exist"});
    }
  })
});

router.get('/',function(req,res,next){
  res.render('LogIn');
})
router.post('/register',function(req,res,next)
{
  var name=req.body.uname;
  if(req.body.pass==req.body.cpass){
  var details=new register(
    {
      username:name,
      address:req.body.address,
      password:req.body.pass,
      cart:" ",
      mobile:req.body.mobile
    });
  register.findOne({username:req.body.uname}).exec(function(err,docs){
    if(docs){
     res.render('SignUp',{javascript:'Already Username Exist'});
    }
    else{
      details.save();
      res.render('LogIn',{javascript:"Successfully Register.Log In to Continue"});
  
}
}) }
  else{
   res.render('SignUp',{javascript:"Password Must Be Same"});
 
}
 });
router.get('/register',function(req,res,next){
  res.render('SignUp');
})
router.post('/Sell',upload.single('Productimage'),function(req,res,next){
  // req.session.username='Sid';
  if(req.session.username){
  var category;
  if(req.body.subcategory){
    category=req.body.category;
  }else{
    category='';
  }
  var details=new ProductDetail({
    model:req.body.Model,
    brand:req.body.brand,
    DateofPurchase:req.body.DateofPurchase,
    Bill:req.body.Bill,
    Category:req.body.category,
    subcategory:category,
    ImageUrl:fileUrl,
    username:req.session.username,
    _id: new mongoose.Types.ObjectId().toHexString(),
});
    details.save();
    res.redirect('/Home');}
    else{
      res.redirect('/login');
    }
});
router.get('/Home',function(req,res,next){
  if(req.session.username){
 var content=[];
  ProductDetail.find({}).exec(function(err,docs){
   for(var i=0;i<docs.length;i++)
   {
     if(docs[i].username!=req.session.username) 
          content.push(docs[i]);
   }
   if(content.length==0){
     res.render('No Found');
   }else{
   req.session.content=JSON.stringify(content);
   res.render('Home',{content:JSON.stringify(content)});
   }
  });}
  else{
    res.redirect('/login');
  }
 })


router.post('/:id',function(req,res,next){
  if(req.session.username){
  ProductDetail.findOne({_id:req.params.id}).exec(function(err,docs){
   var cart=new CartDetails({
     model:docs.model,
     brand:docs.brand,
     DateofPurchase:docs.DateofPurchase,
     Bill:docs.Bill,
     ImageUrl:docs.ImageUrl,
     category:docs.category,
     subcategory:docs.subcategory,
     username:req.session.username,
     _id:docs.id
   });
   cart.save();
   
   //res.send(docs.cart);
   //res.redirect('/');
  res.render('Home',{messages:'Product Has Been Added to Your Cart',content:req.session.content});
  }) }
  else{
    res.redirect('/login');
  }
  
 // res.send(req.session.username+req.params.id);
  
});
router.get('/Cart',function(req,res,next){
   if(req.session.username){
  
  CartDetails.find({username:req.session.username}).exec(function(err,docs){
     if(docs){
       for(var i=0;i<docs.length;i++)
        CartContent.push(docs[i]);
       // res.send(typeof(docs));
        res.render('Cart',{content:JSON.stringify(CartContent)});
     }else{
       res.render('No Found');
     }
      });}
      else{
        res.redirect('/login');
      }
    
    
     
  }) 
router.post('/Cart/:id',function(res,req,next){
  CartDetails.findOne({_id:req.params.id}).exec(function(err,docs){
    docs.remove();
   })
   res.redirect('/Cart');
})
router.get('/category/:category',function(req,res,next){
//  res.send(req.params.category);
if(req.session.username){
  ProductDetail.find({category:req.params.category}).exec(function(err,docs){
   if(docs){
    for(var i=0;i<docs.length;i++)
     CategoryContent.push(docs[i]);
     res.render('Home',{content:JSON.stringify(CategoryContent)});
   }
   else{
    
     res.render('No Found');
   }
  })}
  else{
    res.redirect('/login');
  }

})
router.get('/BookCategory/:book',function(res,req,next){
  if(req.session.username){
  ProductDetail.find({subcategory:req.params.book}).exec(function(err,docs){
    if(docs){
    for(var i=0;i<docs.length;i++)
      CategoryContent.push(doc[i]);
      res.render('Home',{content:JSON.stringify(CategoryContent)});
    }else{
      res.render('No Found');
    }
  })}
  else{
    res.redirect('/login');
  }
  
})
router.get('/Profile',function(req,res,next){
 // req.session.username='Sid';
 if(req.session.username){
  register.findOne({username:req.session.username}).exec(function(err,docs){
    res.render('Profile',{content:JSON.stringify(docs)});
   //  res.send(docs.address);
  })}
  else{
    res.redirect('/login');
  }
})
router.post('/UpdateProfile',function(res,req,next){
  register.findOne({username:req.session.username}).exec(function(err,docs){
    if(req.body.pass==req.body.cpass){
    docs.address=req.body.address;
    docs.password=req.body.pass;
    docs.save();
    res.render('Home',{messages:'Your Profile Updated Successfully',content:req.session.content});
  }
    else{
      res.render('Profile',{messages:'Password must be same'});
    }
  })
})
router.post('/Buy/:id',function(req,res,next){
  ProductDetail.findOne({_id:req.params.id}).exec(function(err,docs){
    ProductContent.push(docs);
    
    register.findOne({username:docs.username}).exec(function(err,doc){
      ProductContent.push(doc);
   //   res.send(doc);
   
   res.render('Buy',{content:JSON.stringify(ProductContent)});
    })
    
  }) })
router.get('/LogOut',function(req,res,next){
  req.session.username=null;
  res.redirect('/LogIn');
})
router.get('/Sold',function(req,res,next){
 // req.session.username='Sid'; //To Be Changed
 if(req.session.username){
  ProductDetail.findOne({username:req.session.username}).exec(function(err,docs){
     if(docs){
       soldcontent.push(docs);
       res.render('Home',{content:JSON.stringify(soldcontent)});
     }else{
       res.render('No Found');
     }
  })}
  else{
    res.redirect('/login');
  }
})

router.get('/Sell',function(req,res,next){
  if(req.session.username)
  res.render('Sell');
  else
  res.redirect('/login');
})
router.get('/ProductToBeSold',function(req,res,next){
 // req.session.username='Sid';
 if(req.session.username){ 
 ProductDetail.find({username:req.session.username}).exec(function(err,docs){
    if(docs){
        for(var i=0;i<docs.length;i++)      
         sellcontent.push(docs[i]);
      //  res.send(docs);
       res.render('Product To Be Sold',{content:JSON.stringify(sellcontent)});
       sellcontent=[];
    }else{
      res.render('No Found')
    }
  }) }
  else{
    res.redirect('/login');
  }
})
router.post('/Sold/:id',function(req,res,next){
  ProductDetail.findOne({_id:req.params.id}).exec(function(err,docs){
   var Solddetails=new SoldDetails(
        {
        Seller:req.session.username,
        brand:docs.brand,
        model:docs.model,
        DateofPurchase:docs.DateofPurchase.substring(0,docs.DateofPurchase.indexOf(T)),
        category:docs.category,
        subcategory:docs.subcategory,
        Bill:docs.Bill,
        Buyer:req.body.BuyersUsername,
        _id: new mongoose.Types.ObjectId().toHexString(),
        ImageUrl:docs.ImageUrl
      
      }
      );
      Solddetails.save();
      docs.remove();
      res.redirect('/Product To Be Sold');
  })
})
router.get('/SoldList',function(req,res,next){
  if(req.session.username){
  SoldDetails.find({Seller:req.session.username}).exec(function(err,docs){
    if(docs)
    {
     for(var i=0;i<docs.length;i++)
       SoldListContent.push(docs[i]);
      res.render('SoldList',{content:JSON.stringify(SoldListContent)});
    }
    else{
      res.render('No Found');
    }
  })}
  else{
    res.redirect('/login');
  }
})
module.exports = router;
