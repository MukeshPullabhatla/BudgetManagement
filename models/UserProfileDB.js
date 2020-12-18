let mongoose = require('mongoose');
let userProfileModel = require('../models/UserProfile');
let UserConnectionDB = require('../models/UserConnectionDB');

let userProfile = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userConnections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserConnection'
    }],
});

let UserProfile = mongoose.model('UserProfile', userProfile);

let createUserProfile = async (UserObjectId) => {
    let userProfile;
    let TempUserProfile = await new UserProfile({userId: UserObjectId, userConnections: []});
    let userp = await TempUserProfile.save();
    if(userp) {
        userProfile = await new userProfileModel.UserProfile(userp.userId, userp.userConnections);
    }
    return userProfile;
};

let getUserProfile = async (UserObjectId) => {
    let userProfileObject = await UserProfile.findOne({userId : UserObjectId})
        .populate({
            path : 'userConnections',
            populate : {
                path : 'ConnectionObject'
            }
        });

    if(userProfileObject) {
        return new userProfileModel.UserProfile(userProfileObject.userId, userProfileObject.userConnections);
    } else {
        return await createUserProfile(UserObjectId);
    }
};

let getAllUserProfileConnections = async (UserObjectId) => {
    let userProfileObject = await UserProfile.findOne({userId : UserObjectId})
        .populate({
            path : 'userConnections',
            populate : {
                path : 'ConnectionObject'
            }
        });

    if(userProfileObject) {
        return userProfileObject.userConnections
    } else {
        return undefined
    }
};

/*
* removeConnection from the Requirement was renamed to deleteUserConnection for better Readability
* removeConnection– removes the UserConnection associated with the given connection.
* */
let deleteConnection = async (UserConnectionId) => {
    let ConnectionName = await UserConnectionDB.findById(UserConnectionId)
        .populate({
            path: 'ConnectionObject'
        });
    let DeletedCollection = await UserConnectionDB.findByIdAndDelete(UserConnectionId);
    if(DeletedCollection) {
        return `Connection "${ConnectionName.ConnectionObject.Name}" deleted successfully`
    } else {
        return `Error Deleting Connection ID "${ConnectionName.ConnectionObject.ConId}". Please use delete button on this page to delete connection.`
    }
};

/*
 * addConnection – adds a UserConnection for this connection /
 * rsvp to the user profile. The profile should not allow multiple UserConnections for the same connection, but should update appropriately if one already exists.
 * */
let addConnection = async (userProfileObject, connectionId, Going) => {
    let tempUserConnection = await new UserConnectionDB({RSVP: Going, ConnectionObject: connectionId});
    tempUserConnection = await tempUserConnection.save();
    userProfileObject.userConnections.push(tempUserConnection);
    return await userProfileObject.save();
};

/*
* updateRSVP was renamed as updateUserConnections in my application for better readability
* updateRSVP- updates an RSVP property for a specified UserConnection
* Checks if the RSVP has one of the following values Yes No Maybe to determine the request is valid
* */
let setConnection = async (Going, reqObject, userId) => {
    let userProfileObject = await UserProfile.findOne({userId : userId})
        .populate({
            path : 'userConnections',
            populate : {
                path : 'ConnectionObject'
            }
        });

    let UpdateOrInsert = await userProfileObject.userConnections.find(element => {
        if(JSON.stringify(element.ConnectionObject.id) === JSON.stringify(reqObject.id)){
            return element
        }
    });

    if(UpdateOrInsert) {
        UpdateOrInsert.RSVP = Going;
        await UpdateOrInsert.save();
    } else {
        await addConnection(userProfileObject, reqObject.id, Going);
    }

    return await getUserProfile(userId);
};

module.exports = UserProfile;
module.exports.getAllUserProfileConnections = getAllUserProfileConnections;
module.exports.getUserProfile = getUserProfile;
module.exports.deleteUserConnection = deleteConnection;
module.exports.setConnection = setConnection;
