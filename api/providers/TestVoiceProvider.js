'use strict';

var twilioConfig = require('../../config/twilio');
var mainApp = require('./../../app');
var client = mainApp.twilio(process.env.TEST_TWILIO_SID?process.env.TEST_TWILIO_SID:twilioConfig.TEST_TWILIO_SID, process.env.TEST_TWILIO_TOKEN?process.env.TEST_TWILIO_TOKEN:twilioConfig.TEST_TWILIO_TOKEN);

module.exports = {
  doCall: doCallFunc
};

function doCallFunc(url, mobile, callBackUrl){

	var params = {
	  to: mobile,
	  from: twilioConfig.testPhoneNumber,
	  url: url,
	  statusCallback: callBackUrl,
  	  statusCallbackMethod: 'POST',
  	  statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed']
	};

	return new Promise(function (resolve, reject) {
		client.makeCall(params, function (err, data) {
			if (err){
				reject(err);
			}else{
				resolve(data);
			}
		});
	});
}