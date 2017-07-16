"use strict"

const express = require('express'),
router = express.Router(),
User = require('../user/model'),
Register = require('../auth/model'),
Friend = require('./model'),
FriendHelper = require('./friend-helper'),
Sesh = require('../sesh/model'),
validator = require('validator');


//send message
//users can send friend request to anyone
//can search for a person by name


//routes
//send friend request
//set request user id as userID
router.post('/friend/request', function(req, res){
  var friend = new Friend({
    'requestUser': req.user._id,
    'receiveUser': req.body.userID
  })
  friend.save()
  .then(friend =>{
    User.findByIdAndUpdate(req.body.UserID, {$push: {friendRequestList: friend._id}})
  }).then(user =>{
    res.status(200).json({'success': true})
  }).catch(err => {
    res.status(500).json({'err': err, 'sucess': false})
  })
})

//respond friend request (accepted or denied)
//set requestUser as the user your resonding too
//set response to friend request as response key in the body with accept or denie
router.post('/friend/response', function(req, res){
  //search for through receiveUser of FriendRequest Schema to repond to a request
  Friend.findAndUpdate({'receiveUser': req.user._id, 'requestUser': req.body.requestUser}, {'response': req.body.response}, {'new': true})
  .then(friendRequest =>{
    if(!friendRequest) res.status(400).json({'success': false, 'msg': 'no friend request found'})
    return FriendHelper.updateFriendList(req.body.requestUser, req.user._id, friendRequest)
  })
  .then(user => {
    res.status(200).json({'success': true, 'user': user})
  })
  .catch(err => {
    res.status(500).json({'success': false, 'err': err})
  })
})

//unfriend a friend
