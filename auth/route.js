const express = require('express'),
  router = express.Router(),
  Register = require('./model'),
  https = require('https'),
  Verify = require('./verify'),
  validator = require('validator'),
  jwt = require('jsonwebtoken'),
  Nexmo = require('nexmo');

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
    if(req.body.phoneNumber === process.env.TEST_PHONENUMBER && req.body.pin === process.env.TEST_PIN)
    Verify.verifyPIN(req.body.phoneNumber, req.body.pin ,testUser)
   .then(userToken => {
     console.log('userToken', userToken)
     res.status(200).json({'success': true, 'token': userToken})
   }).catch(err => {
     console.log('error', err);
     res.status(500).json(err);
   })

  }


})

//check header or body for jwt token and authorize user entry
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers.token;
  console.log('token', token);
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.user = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

module.exports = router;
