var mongoose = require('mongoose');
//var validatorPackage = require('node-mongoose-validator');

var Schema = mongoose.Schema;

var RegisterSchema  = new Schema({
  createdTime: {
    type: Date,
    default: Date.now()
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId
  },
  phoneNumber: {
    type: String
  },
  request_id:  {
    type: String
  },
  verified: {
    type: Boolean
  }

});

var Register = mongoose.model('Register', RegisterSchema);

module.exports = Register
