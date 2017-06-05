var mongoose = require('mongoose');
var validatorPackage = require('node-mongoose-validator');

var Schema = mongoose.Schema;

var verifySchema  = mongoose.Schema({
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
  pin:  {
    type: String
  },
  verified: {
    type: Boolean
  }

});

var Verify = mongoose.model('Verify', verifySchema);

module.exports = Verify
