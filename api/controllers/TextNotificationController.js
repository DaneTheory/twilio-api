'use strict';

var twilioConfig = require('../../config/twilio');
var twilio = require('../providers/TextProvider.js');
var fs = require('fs');

module.exports = {
  sendText: doSendText
};

function doSendText(req, res) {

    var message = req.swagger.params.message.value || '';
    var phone = req.swagger.params.phone.value || '';

    twilio.doSMS(message, phone).then(function (user) {
        console.log('Succesfully sent the message to ' + phone);
        res.json({message: 'Succesfully sent the message'});
    }).catch(function (err) {
        console.log(JSON.stringify(err));
        res.status(500).json({ message: 'Error sending the text message' });
    });
}
