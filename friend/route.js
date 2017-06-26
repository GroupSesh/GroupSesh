"use strict"

const express = require('express'),
router = express.Router(),
User = require('./model'),
Register = require('../auth/model'),
Friend = require('../friend/model'),
Sesh = require('../sesh/model'),
validator = require('validator');

//send message
//users can send friend request to anyone
//can search for a person by name


//routes
//send friend request
//respond friend request (accept or denie)
//unfriend a person
