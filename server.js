const express = require('express');
const app = express();
const config = require('config');
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const connection = require('./models/connection');
const ConnectionDB = require('./models/ConnectionDB');
const User = require('./models/User');
const UserConnection = require('./models/UserConnection');
const UserConnectionDB = require('./models/UserConnectionDB');
const UserDB = require('./models/UserDB');
const UserProfile = require('./models/UserProfile');
const UserProfileDB = require('./models/UserProfileDB');

/*
Importing Routes
*/
const auth = require('./routes/auth.js');
const connectionRoutes = require('./routes/connectionRoutes.js');
const index = require('./routes/index.js');
const userRoutes = require('./routes/userRoutes.js');

const port = 3000;

const accessTokenKey = 'My secret key';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');

mongoose.connect(
	'mongodb+srv://mukesh:mukesh@cluster0.0tclz.mongodb.net/BudgetManagement?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

let db = mongoose.connection;

// Check for Database Error
db.on('error', console.error.bind(console, 'connection error:'));

// Check if Connected to Database
db.once('open', function () {
	console.log('Connection Success !!');
});

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
app.use(
	session({
		secret: 'WillYouMarryMe',
		saveUninitialized: true,
		resave: true,
	})
);

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
	next();
});

app.use(express.json());
app.use('/users', users);
app.use('/auth', auth);
app.use('/connection', connectionRoutes);
app.use('/user', userRoutes);
app.use('/', index);

/*
To handle 404 Error
*/
app.get('*', function (req, res) {
	res.status(404).send({ Error: '404 Not Found' });
});

app.listen(3000);

console.log('Listening on Port 3000');
