const User = require('../user/model'),
  Register = require('../auth/model'),
  Friend = require('./model'),
  Sesh = require('../sesh/model'),
  validator = require('validator');


var FriendHelper = exports

//IN THE FUTURE add notifications to update the requestUser of there new Friend when its accepted
FriendHelper.respondToFriendRequest = function(requestUser, responseUser, friendRequest) {
  return new Promise(function(resolve, reject){
    if(friendRequest.response === 'accepted'){ //check is user accepted the friend request
      User.findById(responseUser) //grab the responding users document
      .then(user =>{
        var friendRequestList = user.profile.friendRequestList; //make copy of friendRequestList because it is immutable
        friendRequestList.splice(user.profile.friendRequestList.indexOf(friendRequest._id), 1);
        //update the response user removing the friendRequest._id from the friendRequestList array.
        //update the response user adding the the requestUser id to the friendList array
        return user.update({$set: {profile: { $push: {friendList: requestUser}, friendRequestList: friendRequestList}}})
      })
      .then(user => {
        //also have update the requestUser with there new friend
        return User.findByIdAndUpdate(requestUser, {$set: {profile: {$push: {friendList: responseUser}}}})
      }).then(user =>{
        resolve(user); //user successfully accepted friend request
      }).catch(err =>{
        reject(err);
      })
    }else if(friendRequest.response === 'denied'){
      //When denied simply remove the friendRequest._id from the friendRequestList
      User.findById(responseUser)
      .then(user =>{
        var friendRequestList = user.profile.friendRequestList;
        friendRequestList.splice(user.profile.friendRequestList.indexOf(friendRequest._id), 1);
        return user.update({$set: {profile: {friendRequestList: friendRequestList}}})
      })
      .then(user => {
        resolve(user); //user successfully denied friend request
      }).catch(err =>{
        reject(err);
      })
    }
  })
}
