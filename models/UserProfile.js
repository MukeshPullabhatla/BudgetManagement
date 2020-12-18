/**
* properties:
* User ID or User to associate this UserProfile object to the user
* a list containing UserConnection objects for this user
* */

class UserProfile {
    /*
    * We can Either use constructor to set the values or Setters as Defined Below
    */
    constructor(userId, userConnections) {
        this._userId = userId;
        this._userConnections = userConnections;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    /*
    * As i am using get and set keywords provided by Javascript we can:
    *
    * just simply call Object.UserConnections which will be translated to Object.getUserConnections which will get the
    * data from get UserConnections()
    *
    * Hence we dont need a specific function for getting the userConnections from this object
    * getUserConnections – returns a List / Collection of UserConnection from the user profile
    *
    * */
    get UserConnections() {
        return this._userConnections;
    }

    set UserConnections(value) {
        this._userConnections = value;
    }

    getUserConnectionIds() {
        let connectionIds;
        if(this._userConnections !== undefined && this._userConnections.length > 0) {
            connectionIds = this._userConnections.map(connection => connection.ConnectionObject.ConId);
        }
        return connectionIds
    };
}

module.exports.UserProfile = UserProfile;
