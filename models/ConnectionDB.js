let mongoose = require('mongoose');
let connectionModel = require('../models/connection');
let SessionStorage = require('../utility/sessionStorage')

let connectionSchema = new mongoose.Schema({
    ConId: {

        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Topic: {
        type: String,
        required: true
    },
    Details: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    DateTime: {
        type: Date,
        required: true
    },
    CreatedBy: {
        type: String,
        required: true
    }
});

let Connection = mongoose.model('Connection', connectionSchema);


/*
Get All connections
Converted the results in Connection Objects from here.
*/

let getConnections = async () => {
    let CategoryData = {};
    let connections = await Connection.find();
    if(connections) {
        connections.forEach(element => {
            let tempConnection = new connectionModel.Connection(element.id, element.ConId, element.Category,
                element.Name, element.Topic, element.Details, element.Location, element.DateTime, element.CreatedBy);
            if(Object.keys(CategoryData).includes(element.Category)) {
                CategoryData[element.Category].push(tempConnection)
            } else {
                CategoryData[element.Category] = [];
                CategoryData[element.Category].push(tempConnection)
            }
        });
        return CategoryData;
    } else {
        return {};
    }
};

let getConnection = async (id) => {
    let connection = await Connection.findOne({ConId: id});
    if(connection){
        return new connectionModel.Connection(connection.id, connection.ConId, connection.Category, connection.Name,
            connection.Topic, connection.Details, connection.Location, connection.DateTime, connection.CreatedBy);
    } else {
        return undefined;
    }
};

let addConnection = async (data) => {
    const id = Math.floor(Math.random()*(999-100+1)+100).toString() + 'tv' + Math.floor(Math.random()*(999-100+1)+100).toString();
    let tempConnections = await new Connection({ConId: id, Category: data.Category, Name: data.Name, Topic: data.Topic, Details: data.Details, Location: data.Location, DateTime: data.DateTime, CreatedBy: data.CreatedBy});
    let newConnection = await tempConnections.save();
    let connec = new connectionModel.Connection(newConnection.id, newConnection.ConId, newConnection.Category, newConnection.Name, newConnection.Topic, newConnection.Details, newConnection.Location, newConnection.DateTime, newConnection.CreatedBy);
    let userProfile = await SessionStorage.setUserConnections("Yes", newConnection, newConnection.CreatedBy);
    return {Connection: connec, Profile: userProfile}
};


module.exports = Connection;
module.exports.getConnections = getConnections;
module.exports.getConnection = getConnection;
module.exports.addConnection = addConnection;
