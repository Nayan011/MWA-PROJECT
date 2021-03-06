var ServiceProvider = require('../models/ServiceProvider');
var Customer = require('../models/Customer');

module.exports={

   addCustomer:function(req,res)
   {
    
     let customer=new Customer({

        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
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


   },

   addTransaction:function(req,res,next){
    
    ServiceProvider.findOne({"_id":"59c92785af5b400a38514492"},(err,provider)=>{
     var data={
         
         fromLoc:req.body.fromLoc,
         toLoc:req.body.toLoc,
         pickDate:req.body.pickDate,
         dropDate:req.body.dropDate,
         budget:req.body.budget,
         status:req.body.status,
         provider:provider
     };
     Customer.update({"email":req.customerEmail },{$push:{"transactions":data}},(err,da)=>{

  console.log(da);
  res.end();


 });

    });

},

updateTransaction:function(req,res){

    Customer.update({"transactions._id":req.params.id},
 {$set:{"transactions.$.status":req.body.status,"transactions.$.budget":req.body.Budget}},(err,detail)=>{

     console.log(detail);
     res.end();
 });

},
getSingleTransaction:function(req,res){
    Customer.findOne({"transactions._id":req.params.id},(err,data)=>{

     var custDetails={};
     custDetails=data.transactions.find(x=>req.params.id==x._id);
     console.log(custDetails);
     res.render('./SingleTransaction.ejs',{tran:custDetails});
     
 });
 
}

     

}

