var mongoose = require('mongoose');
//var validatorPackage = require('node-mongoose-validator');

var Schema = mongoose.Schema;

var FriendRequestSchema  = new Schema({
  createdTime: {
    type: Date,
    default: Date.now()
  },
  requestUser: {
    type: mongoose.Schema.Types.ObjectId
  },
  receiveUser: {
    type: mongoose.Schema.Types.ObjectId
  },
  response: {
    type: String,
    enum : ['accepted', 'denied', 'unresponded'],
    default : 'unresponded'
  }
});

//validations
//FriendRequestSchema.path('response').validate(validator.extend('isResponse', (arg) => responses.indexOf(arg)>=0, 'Not a correct response');

var FriendRequest = mongoose.model('FriendRequest', FriendRequestSchema);

module.exports = FriendRequest
