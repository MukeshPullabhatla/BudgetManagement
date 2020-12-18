/*
* user responding (RSVP) to a connection to save to their account (profile)
* user removing (delete) connections they've saved in their account (profile)
* user changing (update) their response. A user should be able to change any response they previously provided.
* */

var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var cookieParser = require('cookie-parser');
var session = require('express-session');
let mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Gayatri:vaka%402799@cluster0.eqrnf.mongodb.net/Cinco?authSource=admin&replicaSet=atlas-z4c3fg-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;

// Check for Database Error
db.on('error', console.error.bind(console, 'connection error:'));

// Check if Connected to Database
db.once('open', function() {
  console.log("Connection Success !!")
});

var app = express();

app.set('view engine', 'ejs');

/*
Loading Assets and Template Engine
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use('/assets', express.static('assets'));
app.use(expressLayouts);

// Maintaining Sessions
app.use(cookieParser());
app.use(session({
  secret: "WillYouMarryMe",
  saveUninitialized: true,
  resave: true
}));

/*
Importing Routes
*/

let indexRoutes = require('./routes/index.js');
let connectionRoutes = require('./routes/connectionRoutes.js');
let loginRoutes = require('./routes/userRoutes.js');

app.use('/connection', connectionRoutes);
app.use('/user', loginRoutes);
app.use('/', indexRoutes);

/*
To handle 404 Error
*/
app.get('*', function(req, res){
  res.status(404).send({'Error': '404 Not Found'});
});

app.listen(4000);

console.log("Listening on Port 4000");
