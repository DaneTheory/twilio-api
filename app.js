/*eslint-env node */
'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var bodyParser = require('body-parser');
var twilio = require('twilio');

app.use( bodyParser.json() );       //To support JSON-encoded bodies
app.use(bodyParser.urlencoded({     //To support URL-encoded bodies
    extended: true
}));

//Access the Cloud Foundry environment
var cfenv = require('cfenv');

//CORS and header parameters
require('./middleware/CrossOriginMW')(app); 

module.exports = {
    app: app,
    twilio: twilio
}; 

//Get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var config = {
  appRoot: __dirname, //Required config

  swaggerSecurityHandlers: {
    api_keyAuth: function(req, authOrSecDef, scopesOrApiKey, cb) { 
      if (req.query.api_key) {
        var apiKey = req.query.api_key + '';
        if(apiKey === '1'){
          cb();
        }else{
          cb(new Error('access denied!'));
        }
      } else{
        cb(new Error('access denied!'));
      }
    }

  }
  
};


SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

    //Install middleware
    swaggerExpress.register(app);

    var port = appEnv.port || 10010;
    app.listen(port);

    //Print a message when the server starts listening
    console.log("Server started on " + appEnv.url);

    if (swaggerExpress.runner.swagger.paths['/hello']) {
      console.log('try this:\ncurl ' + appEnv.url + '/api/hello?name=tus');
    }
    
});
