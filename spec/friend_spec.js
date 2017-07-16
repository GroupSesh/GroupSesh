//auth spec test file
//this file will create test users

//libraries included
const request = require('request'),
  GroupSesh = require('../app.js');

const base_url = "http://localhost:3000/"

describe("Start Auth Spec Test", function(){
  describe("GET /", function(){
    it("returns status code 200", function(done){
      request.get(base_url, function(err, res, body){
        console.log('res', res.statusCode)
        expect(1).toBe(2);
        expect(res.statusCode).toBe(400);
        done();
      });
    });

    it("returns Hello World", function(done){
      request.get(base_url, function(err, res, body){
        expect(body).toBe("NO World");
        GroupSesh.closeServer();
        done();
      })
    })
  });
});
