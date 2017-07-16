//auth spec test file
//this file will create test users

//libraries included
const request = require('request'),
  GroupSesh = require('../app.js');

const base_url = "http://localhost:3000/"

var created_test_user = function(userArray){
  return  Promise.all(userArray.map(function(user){
    request.post(base_url + 'auth/verifyPin',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: {
        'phoneNumber': '1112223344',
        'pin': '6879'
      }, function(err, res, body){
        if(err) reject(err);
        return({res: res, body: body})
      }
    });
  }));
}

db.allDocs({include_docs: true}).then(function (result) {
  return Promise.all(result.rows.map(function (row) {
    return db.remove(row.doc);
  }));
}).then(function (arrayOfResults) {
  // All docs have really been removed() now!
});

describe("Start Auth Spec Test", function(){
  describe("Create test users", function(){
    it("Create test users", function(done){
    create_test_user()// must pass array
      .then(userArray =>{

      })
      .catch(err =>{
        console.log('create user error msg:' err));
      })
      request.post(base_url + 'auth/verifyPin',
      {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       "Content-Type": "application/json"
     },
     body: {
       'phoneNumber': '1112223344',
       'pin': '6879'
     }, function(err, res, body){
        console.log('res', res.statusCode)
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });
});
