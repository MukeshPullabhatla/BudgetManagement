class UserConnection {

    constructor(id, RSVP, Connection, Seat) {
        this._id = id;
        this._RSVP = RSVP;
        this._Seat = Seat;
        this._ConnectionObject = Connection;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get RSVP() {
        return this._RSVP;
    }

    set RSVP(value) {
        this._RSVP = value;
    }

    get ConnectionObject() {
        return this._ConnectionObject;
    }

    set ConnectionObject(value) {
        this._ConnectionObject = value;
    }

    get Seat() {
        return this._Seat;
    }

    set Seat(value) {
        this._Seat = value;
    }
}

module.exports.UserConnection = UserConnection;
