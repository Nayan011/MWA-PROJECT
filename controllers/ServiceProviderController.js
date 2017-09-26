var ServiceProvider = require('../models/ServiceProvider');
var Customer = require('../models/Customer');

module.exports={

   addServiceProvider:function(req,res)
   {
    
     let serviceProvider=new ServiceProvider({

        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
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
     res.redirect('/providerLogin');
     });


   },
   addService:function(req,res,next){
       
       Customer.findOne({"_id":"59c92126b46e8e29f8b33648"},(err,cus)=>{
        var data={
            
            fromLoc:req.body.fromLoc,
            toLoc:req.body.toLoc,
            pickDate:req.body.pickDate,
            dropDate:req.body.dropDate,
            amountReceived:req.body.amountReceived,
            status:req.body.status,
            customer:cus
        };
    ServiceProvider.update({"email":req.providerEmail },{$push:{"services":data}},(err,da)=>{
 
     console.log(da);
     res.end();
 
 
    });

       });

   },

   updateService:function(req,res){

    ServiceProvider.update({"services._id":req.params.id},
    {$set:{"services.$.status":req.body.status,"services.$.amountReceived":req.body.amountReceived}},(err,da)=>{

        console.log(da);
        res.end();
    });

   },
   getSingleService:function(req,res){
    ServiceProvider.findOne({"services._id":req.params.id},(err,data)=>{

        var service={};
        service=data.services.find(x=>req.params.id==x._id);
        console.log(service);
        res.render('./singleService.ejs',{service:service});
        
    });
    
   }
   /*,
   findProviderServiceByEmail:function(req,res){

    ServiceProvider.findOne({"email":req.body.email},(err,provider)=>{
        console.log(provider);

        if(err){
            res.redirect('/providerLogin');
        }
        if(provider){
            req.session.providerEmail=provider.email;
            res.render('./providerProfile.ejs',{provider:provider});

        }
        
    });
   },
   providerLogout:function(req,res){

    req.session.providerEmail="";
    res.redirect('/providerLogin');
   }
     */

}

