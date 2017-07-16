"use strict"
const express = require('express'),
  router = express.Router(),
  User = require('./model'),
  Register = require('../auth/model'),
  Friend = require('../friend/model'),
  Sesh = require('../sesh/model'),
  validator = require('validator');

      // AWS S3 boiler plate information
const aws = require('aws-sdk'),
  multer = require('multer'),
  multerS3 = require('multer-s3');

// aws.config.loadFromPath('./config.json');
var s3 = new aws.S3({
  endpoint: 's3-ca-central-1.amazonaws.com',
  signatureVersion: 'v4',
  region: 'ca-central-1'
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'groupsesh',
    storageClass: 'profilePics',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname);
    }
  })
})

//create a post on the news feed
//search a user
//read own profile
//search a user
//Update a users profile

router.post('/user/update',upload.array('profilePic', 3), function(req, res){
  console.log('file', req.file);
  console.log('body', req.body);
  req.body.profilePic = req.file.location;
  User.findByIdAndUpdate(req.user._id, {$set: req.body} ,{'new': true,'runValidators': true})
    .then(user => {
      res.status(200).json({'success': true});
    }).catch(err => {
      res.status(500).json(err);
    });
})

//read owners profile
router.post('/user/read', function(req, res){
  User.findById(req.user._id)
  .then(user => {
    res.status(200).json({'success': true, 'user': user});
  }).catch(err =>{
    res.status(400).json({'success': false, 'msg': 'user not found'});
  })
})

//search a user
//search by FirstName, LastName
router.post('/user/search', function(req, res){
  let regex = new RegExp(req.body.query, 'i');
  User.find({})
  User.aggregate([
    // Project the concatenated full name along with the original doc
    {$project: {fullname: {$concat: ['$name.first', ' ', '$name.last']}, doc: '$$ROOT'}},
    {$match:{ $or: [
  {'profile.firstName':'/^' + regex + '.*/'},
  {'profile.lastName': '/^' + regex + '.*/'}
    ]}}
  ], function(err, users) {
    // Extract the original doc from each item
    var usersArray = users.map(function(item) { return item.doc; });
    console.log(usersArray);
    res.json({'success': true, 'users': usersArray})
  });
})













module.exports = router;
