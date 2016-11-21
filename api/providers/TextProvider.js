'use strict';

var twilioConfig = require('../../config/twilio');
var mainApp = require('./../../app');
var client = mainApp.twilio(process.env.TWILIO_SID?process.env.TWILIO_SID:twilioConfig.TWILIO_SID, process.env.TWILIO_TOKEN?process.env.TWILIO_TOKEN:twilioConfig.TWILIO_TOKEN);

module.exports = {
  doSMS: doSMSFunc
};

function doSMSFunc(message, mobile){

	var params = {
	  to: mobile,
	  from: twilioConfig.alphanumericSenderID,
	  body: message
	};

	return new Promise(function (resolve, reject) {
		client.sendMessage(params, function (err, data) {
			if (err){
                
                if(err.code == 21612){
                    
                    params.from = twilioConfig.phoneNumber;
                    
                    client.sendMessage(params, function (err, data) {
                        if (err){
                            reject(err); 
                        }else{
                            resolve(data);
                        }
                    });
                    
                }else{
                   reject(err); 
                }
				
			}else{
				resolve(data);
			}
		});
	});
}