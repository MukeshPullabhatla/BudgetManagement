let mongoose = require('mongoose');
let userModel = require('../models/user');

let userSchema = new mongoose.Schema({
    UserID: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: false
    },
    FirstName: {
        type: String,
        required: false
    },
    LastName: {
        type: String,
        required: false
    }
});

let User = mongoose.model('User', userSchema);

let getUser = async (UserID, Password) => {
    let CurrentUser = await User.findOne({UserID: UserID, Password: Password});
    if(CurrentUser) {
        return new userModel.User(CurrentUser.id, CurrentUser.UserID, CurrentUser.Email, CurrentUser.FirstName, CurrentUser.LastName)
    } else {
        return undefined
    }
};


module.exports = User;
module.exports.getUser = getUser;
