"use strict"

var mongoose = require('mongoose');
//var validatorPackage = require('node-mongoose-validator');

var Schema = mongoose.Schema;

var userSchema  = new Schema({
  createdTime: {
    type: Date,
    default: Date.now()
  },
  profile: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    profilePic: {
      type: Array
    },
    bio: {
      type: String,
      max: 250
    },
    phoneNumber: {
      type: String
    },
    preference: {
      type: String,
      enum: ['Sativa', 'Indica']
    },
    method: {
      type: String,
      enum: ['joints', 'bongs', 'pipes', 'vape', 'edibles', 'dabs', 'concentrates','all']
    },
    favoriteStrain: {
      type: String,
    },
    frequency: {
      type: String,
      enum: ['heavy', 'moderate', 'light']
    },
    activities: [{
      type: String
    }],
    friendRequestList: [{
      type: mongoose.Schema.Types.ObjectId
    }],
    friendList: [{
      type: mongoose.Schema.Types.ObjectId
    }],
    seshList: [{
      type: mongoose.Schema.Types.ObjectId
    }]
  },
  role: {
    type: String,
    enum: ['user','dispencery', 'admin', 'test_user'],
    default: 'user'
  },
  location: {
    latitude: {
      type: String
    },
    longitude: {
      type: String
    }
  },
  jwt: {
    type: String
  },
});


var User = mongoose.model('User', userSchema);

module.exports = User
