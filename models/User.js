class User {
  /*
  * We can Either use constructor to set the values or Setters as Defined Below
  */
  constructor(id, userid, email, fname, lname){
    this._id = id;
    this._UserID = userid;
    this._Email = email;
    this._FirstName = fname;
    this._LastName = lname;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get UserID() {
    return this._UserID;
  }

  set UserID(value) {
    this._UserID = value;
  }

  get Email() {
    return this._Email;
  }

  set Email(value) {
    this._Email = value;
  }

  get FirstName() {
    return this._FirstName;
  }

  set FirstName(value) {
    this._FirstName = value;
  }

  get LastName() {
    return this._LastName;
  }

  set LastName(value) {
    this._LastName = value;
  }
}

module.exports.User = User;
