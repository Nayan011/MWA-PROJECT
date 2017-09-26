var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan'); // used to see requests
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var session = require('express-session');
var app = express();
//var Customer = require('./models/Customer.server.model');
var config = require('./config');
var jwt = require('jsonwebtoken');
//require('./routes/userProfile.server.route')(app);
app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 app.use(cookieParser())
 app.use(session({secret: 'ssshhhhh'}));
 app.set('views', path.join(__dirname, 'views'));
 

 app.set('view  engine', 'ejs'); // set up ejs for templating


 app.use(morgan('dev'));

 mongoose.connect(config.database);

 
 var checkAuth = function (req, res, next) {
    console.log("Checking authentication");
  
    if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
      req.provider = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      let data = decodedToken.payload;
      req.providerEmail=data.email;
      //console.log("email from Auth"+req.provider.email);
      console.log("from d"+req.cookies.nToken);
    }
  
    next()
  };
  
  app.use(checkAuth);
  const serviceProvider=require('./controllers/ServiceProviderController');
  const serviceProviderAuth=require('./controllers/ServiceProviderAuth');
  const customerService=require('./controllers/CustomerController');
 
app.get('/createServiceProvider',function(req,res){

    res.render('./createServiceProvider.ejs');
});
app.post('/createServiceProvider',serviceProvider.addServiceProvider);
app.get('/createCustomer',function(req,res){
    
        res.render('./addCustomer.ejs');
    });
app.post('/createCustomer',customerService.addCustomer);

app.get('/addService',(req,res)=>{
    res.render("./providerProfile.ejs");
});
app.post('/addService',serviceProvider.addService);
app.get('/updateService',serviceProvider.updateService);
app.get('/singleService/:id',serviceProvider.getSingleService);
app.post('/updateService/:id',serviceProvider.updateService);
app.get('/providerLogin',function(req,res){

    res.render('./providerLogin.ejs');
});
app.post('/providerLogin',serviceProviderAuth.ServiceProviderLogin);
//app.get('/providerLogout',serviceProviderAuth.providerLogout);


 // START THE SERVER
 // ===============================
 //var port=process.env.PORT || 8080,
 app.listen(config.port);
 console.log('Magic happens on port ' + config.port);
