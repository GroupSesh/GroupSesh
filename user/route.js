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
var s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'groupsesh',
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
router.post('/user/update',upload.single('userProfilePic'), function(req, res){
  user.update({
    $set: {
      'profile.firstName': req.body.firstName || req.user.profile.firstName,
      'profile.lastName': req.body.lastName || req.user.profile.lastName,
      'profile.profilePic': req.body.profilePic || req.user.profile.profilePic,
      'profile.bio': req.body.bio || req.user.profile.bio,
      'profile.preference': req.body.preference || user.profile.preference,
      'profile.method': req.body.method || req.user.profile.method,
      'profile.favoriteStrain': req.body.favoriteStrain || req.user.profile.favoriteStrain,
      'profile.frequency': req.body.frequency || req.user.profile.frequency,
      'profile.activities': req.body.activites|| req.user.profile.activities
    }}, {'runValidators': true})
    .then(update => {
      res.status(200).json({'success': true});
    }).catch(err => {
      res.status(500).json(err);
    });
})

//read owners profile
router.post('/user/read', function(req, res){
  res.status(200).json({'success': true, 'user': req.user});
})

//search a user
router.post('/user/search', function(req, res){
  if(validator.isMobilePhone(req.body.query))
  User.find({})
})











module.exports = router;
