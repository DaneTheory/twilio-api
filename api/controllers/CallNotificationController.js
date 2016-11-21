'use strict';


var twilio = require('../providers/VoiceProvider.js');
var twilioConfig = require('./../../config/twilio');
var fs = require('fs');

module.exports = {
    makeCall: makeCall
};

function makeCall(req, res) {

    var broadcastId = "1";
    var twiml = twilioConfig.twiml + '';
    var baseUrl = twilioConfig.twimlProviderBaseUrl + '';
    var statusCallBackUrl = twilioConfig.statusCallBackUrl + '';
    var message = req.swagger.params.message.value || '';
    var phone = req.swagger.params.phone.value || '';

    var phone = obj.phone + '';
    var customTwiml = twiml.replace("VARPHONE", phone).replace("VARBROARCASTID", broadcastId).replace("VARMESSAGE", message + '');
    
    var url  = baseUrl + encodeURIComponent(customTwiml);

    var statusUrl = statusCallBackUrl.replace("VARPHONE", phone).replace("VARBROARCASTID", broadcastId).replace("VARMESSAGE", message + '');

    twilio.doCall(url, phone, statusUrl).then(function (user) {
        console.log('Succesfully called the user phone No  - ' + phone);
        res.json({message: 'Succesfully called the user'});

    }).catch(function (err) {
        console.log(err);
        res.json({message: 'Error calling the User'});
    });

}
