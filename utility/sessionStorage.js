// Mongoose Imports
let userDB = require('../models/UserDB');
let userProfileDB = require('../models/UserProfileDB');
let userConnectionDB = require('../models/UserConnectionDB');

let userDetails = undefined;
let userConnections = undefined;
let userProfile = undefined;

/*
* Initialing UserProfile with the User that just logged in.
*/

let getUserProfile = async (userId) => {
    user = await userDB.findOne({UserID: userId});
    userProfile = await userProfileDB.getUserProfile(user.id);
    return userProfile;
};

let setUserConnections = async (Going, reqObject, userId) => {
    let user = await userDB.findOne({UserID: userId});
    userProfile = await userProfileDB.setConnection(Going, reqObject, user.id);
    return userProfile;

};

let setUserConnectionSeat = async (requestBody) => {
    let updateConnection = await userConnectionDB.findById(requestBody.UserConnectionId);

    if (updateConnection) {
        updateConnection.Seat = requestBody.Seat;
        let savedConnection = await updateConnection.save();
        if(savedConnection) {
            return `Seat Selected : ${savedConnection.Seat}`
        } else {
            return `Error in seat selection`
        }
    }
};

let getUserConnections = () => {
    return userProfileDB.getAllUserProfileConnections(userDetails.id);
};

let userName = () => {
    if(userDetails !== undefined){
        return userDetails.UserID;
    } else {
        return userDetails;
    }
};

let isLoggedIn = () => {
    return userDetails !== undefined;
};

let deleteUserConnection = async (ConnectionId) => {
    return await userProfileDB.deleteUserConnection(ConnectionId);
};

let destroySession = () => {
    userDetails = undefined;
    userProfile = undefined;
    userConnections = undefined;
};

module.exports.setUserConnections = setUserConnections;
module.exports.setUserConnectionSeat = setUserConnectionSeat;
module.exports.getUserProfile = getUserProfile;
module.exports.userConnections = getUserConnections;
module.exports.userName = userName;
module.exports.isLoggedIn = isLoggedIn;
module.exports.deleteUserConnection = deleteUserConnection;
module.exports.destroySession = destroySession;
