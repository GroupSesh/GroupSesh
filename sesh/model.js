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
  email: {
    type: String,
    unique: true,
    required: true,
    //  HTML5 email validation regex
    validate: function(email) {
      return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }
  },
  password: {
    type: String,
    required:true
  },
  phoneNumber: {
    type: String,
    unique: true,
    validate: {
      validator: function(num) {
        // 10 digits
        var regexStuff = /^\d{10}$/;
        // checks that number exists and then checks against regex
        return (num === null || num.trim().length < 1) || regexStuff.test(num)
      },
      message: 'Provided phone number is invalid and/or not a US number'
    }
  }

});

var User = mongoose.model('User', userSchema);

module.exports = User
