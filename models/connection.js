class Connection {

  /*
  We can Either use constructor to set the values or Setters as Defined Below
  */
  constructor(id, conId, category, name, topic, details, location, dateTime, createdBy){
    this._id = id;
    this._ConId = conId;
    this._Category = category;
    this._Name = name;
    this._Topic = topic;
    this._Details =  details;
    this._Location = location;
    this._DateTime = dateTime;
    this._CreatedBy = createdBy;
  }
  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get ConId() {
    return this._ConId;
  };
  get Category() {
    return this._Category;
  };
  get Name(){
    return this._Name;
  };
  get Topic(){
    return this._Topic;
  };
  get Details(){
    return this._Details;
  };
  get Location() {
    return this._Location;
  };
  get DateTime(){
    return this._DateTime;
  };
  get CreatedBy() {
    return this._CreatedBy;
  }

  set ConId(conId) {
    this._ConId = conId;
  };
  set Category(category) {
    this._Category = category;
  };
  set Name(name){
    this._Name = name;
  };
  set Topic(topic){
    this._Topic = topic;
  };
  set Details(details){
    this._Details = details;
  };
  set Location(location) {
    this._Location = location;
  };
  set DateTime(dateTime){
    this._DateTime = dateTime;
  };

  set CreatedBy(value) {
    this._CreatedBy = value;
  }
}

module.exports.Connection = Connection;
