var express = require('express');
var router = express.Router();
var User = require('../user/model');
var https = require('https');

var options = {
  host: 'api.nexmo.com',
  path: '/verify/json',
  port: 443,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

//send phoneNumber
router.post('/user/phoneNumber', function(request, response){
  var data = JSON.stringify({
    api_key: 'API_KEY',
    api_secret: 'API_SECRET',
    number: request.body.number,
    brand: 'GroupSesh'
  });
  var req = https.request(options);

  req.write(data);
  req.end();

  var responseData = '';
  req.on('response', function(res){
    res.on('data', function(chunk){
      responseData += chunk;
    });

    res.on('end', function(){
      console.log(JSON.parse(responseData));
    });
  });

});

//send phoneNumber and PIN
router.post('/user/verifyPIN', function(request, response){
  
  var data = JSON.stringify({
  api_key: 'API_KEY',
  api_secret: 'API_SECRET',
  request_id: 'ID_RETURNED_IN_THE_VERIFY_RESPONSE',
  code: request.body.pin
});

var options = {
  host: 'api.nexmo.com',
  path: '/verify/check/json',
  port: 443,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

var req = https.request(options);

req.write(data);
req.end();

var responseData = '';
req.on('response', function(res){
  res.on('data', function(chunk){
    responseData += chunk;
  });

  res.on('end', function(){
    console.log(JSON.parse(responseData));
  });
});
})

module.exports = router;
