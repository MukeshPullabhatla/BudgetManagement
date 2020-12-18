let mongoose = require('mongoose');

let userConnectionSchema = new mongoose.Schema({
    RSVP: {
        type: String,
        required: true
    },
    ConnectionObject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Connection'
    },
    Seat: {
        type: String,
    },
});

userConnectionSchema.post("findOneAndDelete", async (document) => {
    const userConnectionId = document._id;
    let UserProfileDB = require('../models/UserProfileDB');
    let findAll = await UserProfileDB.find({ userConnections: { $in: [userConnectionId] } })
    await findAll.map(async connection =>
        await UserProfileDB.findOneAndUpdate(
            { _id: connection._id },
            { $pull: { userConnections: userConnectionId } },
            { new: true }
        )
    );
});

let UserConnection = mongoose.model('UserConnection', userConnectionSchema);
module.exports =  UserConnection;
