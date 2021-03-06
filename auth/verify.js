const Register = require('./model'),
  User = require('../user/model'),
  jwt = require('jsonwebtoken'),
  Nexmo = require('nexmo');

var nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API,
  apiSecret: process.env.NEXMO_SECRET
});


var Verify = exports

Verify.generateToken = function(user) {
  return jwt.sign(user, process.env.SECRET, {
    expiresIn: 12*7*24*60*60 // 12 weeks
  });
}

Verify.setUserInfo = function(request) {
  return {
    _id: request._id,
    phoneNumber: request.profile.phoneNumber,
    role: request.role,
    firstName: request.profile.firstName || null,
    lastName: request.profile.lastName || null,
    profilePic: request.profile.profilePic || null,
    lat: request.location.latitude || null,
    long: request.location.longitude || null
  };
}

Verify.searchVerification = function(register){
  return new Promise(function(resolve, reject){
    nexmo.verify.search(register.request_id, function(err, res){
      if(err) reject(err)
      if(res.checks[res.checks.length].status == '0'){
        reject({'response': res, 'msg': 'already resolved'})
        //update us on this
      }else{
        resolve(res)
      }
    });
  })
}

Verify.requestPIN = function(phoneNumber){
  return new Promise(function(resolve, reject){
    nexmo.verify.request({number: phoneNumber, brand:'GroupSesh'},function(err, res){
      if(err) throw Error({'err' : err});
      if(res.status == '0') {
        Register.update({'phoneNumber': phoneNumber},
          {
            'phoneNumber': phoneNumber,
            'request_id': res.request_id,
            'verified': false
          },
          { 'upsert': true,
            'setDefaultsOnInsert': true})
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject(err);
        })
      }else {
        //come back handle different rejections
        reject(res)
      }
    });
  });

}

Verify.nexmoVerifyPromise = function(register, pin){
  return new Promise(function(resolve, reject){
    nexmo.verify.check({request_id: register.request_id,code:pin},function(err, res){
      if(res.status == '0'){
        resolve(res);
      }else {
        reject(res);
      }
    });
  })
}

Verify.verifyPIN = function(phoneNumber, pin, testUser){
  return new Promise(function(resolve, reject){
    if(testUser){

    }
    Register.findOne({'phoneNumber': phoneNumber})
  .then((register) => {
    if(!register) throw new Error({'msg': 'Phone Number not found'})
    return Verify.nexmoVerifyPromise(register, pin)
  }).then(res => {
    return Register.update({'phoneNumber': phoneNumber}, {'verified': true})
  }).then(res => {
    var user = new User({
      'phoneNumber': phoneNumber
    })
    return user.save()
  }).then(user => {
    var userInfo = Verify.setUserInfo(user);
    user.update({jwt: 'JWT' + Verify.generateToken(userInfo)});
  }).then(user => {
    resolve(user.jwt)
  }).catch(err => {
    reject(err)
  })
  });
}
