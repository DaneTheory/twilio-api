'use strict';

module.exports = {

    alphanumericSenderID: '', // Alphanumeric Sender ID Registered with twilio
	phoneNumber: '', // Live phone Number which is allowed for Voice and SMS Service
    testPhoneNumber: '', // Test phone Number eg -(+15005550006) 
	TWILIO_SID: '', // Twilio Live Account SID
    TEST_TWILIO_SID: '', // Twilio Test Account SID
	TWILIO_TOKEN: '', // Twilio Live Account Auth Token
    TEST_TWILIO_TOKEN: '', // Twilio Test Account Auth Token
	statusCallBackUrl: '', // The URL the phone status Should be return after the phhone call is made
	twimlProviderBaseUrl: '', // The URL to generate twiml(Vice XML) 
	twiml: '' // Custom twiml Format which is used in twimlProviderBaseUrl Eg (<Response>     <Gather numDigits="1" timeout="10" action="http://bt-voice.mybluemix.net/gatherParams?phone_no=VARPHONE|broadcast_id=VARBROARCASTID" method="GET">         <Say>VARMESSAGE</Say>     </Gather> <Say>You did not press a key. Goodbye.</Say></Response>)
}