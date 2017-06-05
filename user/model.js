var mongoose = require('mongoose');
var validatorPackage = require('node-mongoose-validator');

var Schema = mongoose.Schema;

var userSchema  = mongoose.Schema({
  createdTime: {
    type: Date,
    default: Date.now()
  },
  profilePic: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  friendList: {
    type: Array
  },
  seshList: {
    type: Array
  },


});

var User = mongoose.model('User', userSchema);

module.exports = User
