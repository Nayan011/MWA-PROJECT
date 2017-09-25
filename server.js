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
 const serviceProvider=require('./controllers/ServiceProviderController');
 
app.get('/createService',function(req,res){

    res.render('./addService.ejs');
});
app.post('/createService',serviceProvider.addServiceProvider);


 // START THE SERVER
 // ===============================
 //var port=process.env.PORT || 8080,
 app.listen(config.port);
 console.log('Magic happens on port ' + config.port);