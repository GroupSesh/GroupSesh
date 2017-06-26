const User = require('./model');

var GroupSesh = exports

GroupSesh.query = function(query){
  return new Promise(function(resolve, reject){
    if(validator.isMobilePhone(req.body.query)){
      User.find({'phoneNumber': req.body.query})
      .then(users => {
        resolve(users)
      }).catch(err => {
        reject(err)
      })
    }else if(validator.blacklist(query, ['\\[\\]'])){
      
    }else{
      reject({'msg': 'incorrect input query, not a phoneNumber or name'})
    }

  })
}
