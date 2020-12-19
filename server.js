const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const budgetModel = require('./models/budgetModel');

const userModel = require('./models/userModel');
const users = require('./routes/users');
const auth = require('./routes/auth');
const budget = require('./routes/budget');
const feedback = require('./routes/feedback');

const feedbackModel = require('./models/feedbackModel');
const port = 3000;
const accessTokenKey = 'secret key';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var url =
	'mongodb+srv://mukesh:mukesh@cluster0.0tclz.mongodb.net/BudgetManagement?retryWrites=true&w=majority';

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('connected to MongoDB!'))
	.catch((err) => console.error('error occured', err));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
	next();
});

app.use(express.json());
app.use('/users', users);
app.use('/auth', auth);
app.use('/budget', budget);
app.use('/feedback', feedback);
app.use('', express.static('public'));

app.listen(port, () => {
	console.log('App is running on port ' + port);
});
