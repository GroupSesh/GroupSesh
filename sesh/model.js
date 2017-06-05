var mongoose = require('mongoose');
var validatorPackage = require('node-mongoose-validator');

var Schema = mongoose.Schema;

var SeshSchema  = mongoose.Schema({
  createdTime: {
    type: Date,
    default: Date.now()
  },
  seshType: {
    type: String //joints, bongs, dabs,  everything and anything
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  location: {
    longitude:{
      type: String
    },
    latitude:{
      type: String
    }
  }

});

var Sesh = mongoose.model('Sesh', userSchema);

module.exports = Sesh
