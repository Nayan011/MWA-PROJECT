var ServiceProvider = require('../models/ServiceProvider');
var Customer = require('../models/Customer');

module.exports={

   addCustomer:function(req,res)
   {
    
     let customer=new Customer({

        name:req.body.name,
        email:req.body.email,
        mobileNo:req.body.mobileNo,
    

     });
     customer.save((err,data)=>{

    if(err)
    {
        console.log(err);
    }
     
     console.log(data);
     res.redirect('/createCustomer');
     });


   }

     

}

