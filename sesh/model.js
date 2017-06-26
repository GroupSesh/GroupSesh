var mongoose = require('mongoose');
//var validatorPackage = require('node-mongoose-validator');

var Schema = mongoose.Schema;

var SeshSchema  = new Schema({
  createdTime: {
    type: Date,
    default: Date.now()
  },
  profile: {
    seshType: {
      type: String, //joints, bongs, dabs,  everything and anything
      enum: ['joints', 'bongs', 'pipes', 'vape', 'edibles', 'dabs', 'concentrates','all']
    },
    acitivity: {
      type: String
    },
    bio: {
      type: String,
      max: 250
    }
  },
  schedule: {
    active:{
      type: Boolean
    },
    startTime: {
      type: Date
    },
    endTime: {
      type: Date
    }
  },
  location: {
    longitude:{
      type: String
    },
    latitude:{
      type: String
    }
  },
  Attendence: {
    expectedUsers: [{
      type: mongoose.Schema.Types.ObjectId
    }],
    currentUsers: [{
      type: mongoose.Schema.Types.ObjectId
    }],
    attendedUsers:[{
      type: mongoose.Schema.Types.ObjectId
    }]
  }

});

var Sesh = mongoose.model('Sesh', SeshSchema);

module.exports = Sesh
