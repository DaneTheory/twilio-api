'use strict';

var twilioConfig = require('../../config/twilio');
var mainApp = require('./../../app');
var client = mainApp.twilio(process.env.TWILIO_SID?process.env.TWILIO_SID:twilioConfig.TWILIO_SID, process.env.TWILIO_TOKEN?process.env.TWILIO_TOKEN:twilioConfig.TWILIO_TOKEN);

module.exports = {
  doCall: doCallFunc
};

function doCallFunc(url, mobile, callBackUrl){

	var params = {
	  to: mobile,
      from: twilioConfig.alphanumericSenderID,
	  url: url,
	  statusCallback: callBackUrl,
  	  statusCallbackMethod: 'POST',
  	  statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed']
	};

	return new Promise(function (resolve, reject) {
		client.makeCall(params, function (err, data) {
			if (err){
                
				if(err.code == 21612){
                    
                    params.from = twilioConfig.phoneNumber;
                    
                    client.makeCall(params, function (err, data) {
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