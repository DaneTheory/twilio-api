'use strict';

var twilioConfig = require('../../config/twilio');
var mainApp = require('./../../app');
var client = mainApp.twilio(process.env.TEST_TWILIO_SID?process.env.TEST_TWILIO_SID:twilioConfig.TEST_TWILIO_SID, process.env.TEST_TWILIO_TOKEN?process.env.TEST_TWILIO_TOKEN:twilioConfig.TEST_TWILIO_TOKEN);

module.exports = {
  doSMS: doSMSFunc
};

function doSMSFunc(message, mobile){

	var params = {
	  to: mobile,
	  from: twilioConfig.testPhoneNumber,
	  body: message
	};

	return new Promise(function (resolve, reject) {
		client.sendMessage(params, function (err, data) {
			if (err){
				reject(err);
			}else{
				resolve(data);
			}
		});
	});
}