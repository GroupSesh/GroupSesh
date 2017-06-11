var express = require('express');
var router = express.Router();
var Register = require('./model');
var https = require('https');
var Verify = require('./verify');
var validator = require('validator');
var Nexmo = require('nexmo');

var nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API,
    apiSecret: process.env.NEXMO_SECRET
  });

//send phoneNumber
router.post('/auth/phoneNumber', function(req, res){
    if(true || validator.isMobilePhone(req.body.phoneNumber, ['en-CA','zh-CN'])){
      console.log('isMobilePhone');
    Verify.requestPIN(req.body.phoneNumber)
    .then(resp => {
      res.status(200).json({'success': true, 'msg': 'PIN will be sent to the number'});
    }).catch(err => {
      res.status(500).json(err);
    })
    }else{
      res.json({'success': false, 'error': 'not a phone number'});
    }
});

//send phoneNumber and pin
router.post('/auth/verifyPIN', function(req, res){
  if( true || validator.isMobilePhone(req.body.phoneNumber, ['en-CA','zh-CN'])
           && validator.length(req.body.pin, {'min': 4, 'max': 4})){

             Verify.verifyPIN(req.body.phoneNumber, req.body.pin)
             .then(userToken => {
               console.log('userToken', userToken)
               res.status(200).json({'success': true, 'token': 'JWT' + userToken})
             }).catch(err => {
               console.log('error', err);
               res.status(500).json(err);
             })

           }


})

module.exports = router;
