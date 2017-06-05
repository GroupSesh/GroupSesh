var mongoose = require('mongoose');
var validatorPackage = require('node-mongoose-validator');

var Schema = mongoose.Schema;

var responses = ['accepted', 'denied', 'unresponded']

var FriendRequestSchema  = mongoose.Schema({
  createdTime: {
    type: Date,
    default: Date.now()
  },
  requestUser: {
    type: mongoose.Schema.Types.ObjectId
  },
  receiveUser: {
    type: mongoose.Schema.Types.ObjectId
  }
  response: {
    type: String
  }
});

//validations
FriendRequestSchema.path('response').validate(validator.extend('isResponse', (arg) => responses.indexOf(arg)>=0, 'Not a correct response');

var FriendRequest = mongoose.model('FriendRequest', FriendRequestSchema);

module.exports = FriendRequest