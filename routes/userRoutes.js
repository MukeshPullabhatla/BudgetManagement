var express = require('express');
var router = express.Router();

let sessionStorage = require('../utility/sessionStorage');

let userModel = require('../models/user');

// Mongoose Imports
let userDB = require('../models/UserDB');
let userProfileDB = require('../models/UserProfileDB');
let ConnectionDB = require('../models/ConnectionDB');

router.post('/login', async (req, res) => {
  let user, userProfile;
  let RequestedUser = await userDB.getUser(req.body.Username, req.body.Password);
  if(RequestedUser) {
    user = new userModel.User(RequestedUser.id, RequestedUser.UserID, RequestedUser.Email, RequestedUser.FirstName, RequestedUser.LastName);
    userProfile = await userProfileDB.getUserProfile(user.id);
  }
  res.status(200).send({ User: user, Profile: userProfile});
});

router.post('/register', async (req, res) => {
  let user, userProfile;
  let userObject = ['UserID', 'Password', 'Email', 'FirstName', 'LastName'];
  if(Object.keys(req.body).length === 5 && JSON.stringify(Object.keys(req.body)) === JSON.stringify(userObject)){
    let RequestedUser = await new userDB({UserID: req.body.UserID, Password: req.body.Password, Email: req.body.Email, FirstName: req.body.FirstName, LastName: req.body.LastName});
    RequestedUser = await RequestedUser.save();
    user = await new userModel.User(RequestedUser.id, RequestedUser.UserID, RequestedUser.Email, RequestedUser.FirstName, RequestedUser.LastName);
    userProfile = await userProfileDB.getUserProfile(user.id);
    console.log(userProfile);
    res.status(200).send({ User: user, Profile: userProfile});
  } else {
    res.status(500).send({ error: 'Please send the form correctly'});
  }
});

router.post('/savedconnections', async (req, res) => {
  let tempConnections = await ConnectionDB.getConnection(req.body.ConId);
  let UserProfile = await  sessionStorage.setUserConnections(req.body.RSVP, tempConnections, req.body.UserID);
  res.status(200).send({Profile: UserProfile});
});

router.post('/setSeat', async (req, res) => {
  let response = await sessionStorage.setUserConnectionSeat(req.body);
  res.status(200).send({response: response});
});

/*
* Delete a user's rsvp for a connection - delete a specific user connection already in the profile
* */
router.post('/connection/delete', async (req, res) => {
  let ConId = req.body.ConId;
  let UserId = req.body.UserID;
  let responseFeedback = await sessionStorage.deleteUserConnection(ConId);
  let User = await userDB.findOne({UserID: UserId});
  let sendUser = new userModel.User(User.id, User.UserID, User.Email, User.FirstName, User.LastName);
  let UserProfile = await sessionStorage.getUserProfile(User.UserID);
  res.status(200).send({User: sendUser, Profile: UserProfile, feedback: responseFeedback });
});

module.exports = router;
