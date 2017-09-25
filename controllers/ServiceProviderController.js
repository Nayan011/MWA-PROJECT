var ServiceProvider = require('../models/ServiceProvider');
//var Product = require('../models/Product.server.model');

module.exports={

   addServiceProvider:function(req,res)
   {
    
     let serviceProvider=new ServiceProvider({

        name:req.body.name,
        licenceNo:req.body.licenceNo,
        accountNo:req.body.accountNo,
        bankName:req.body.bankName,

     });
     serviceProvider.save((err,data)=>{

    if(err)
    {
        console.log(err);
    }
     
     console.log(data);
     res.redirect('/createService');
     });


   }

     

}

