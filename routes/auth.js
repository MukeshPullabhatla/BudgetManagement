const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const express = require('express');
const router = express.Router();
const jwt_decode = require('jwt-decode');
const exjwt = require('express-jwt');
const cors = require('cors');
router.use(cors());

const accessTokenKey = 'My super secret key';

const jwtMW = exjwt({
	secret: accessTokenKey,
	algorithms: ['HS256'],
});
router.post('/', async (req, res) => {
	//  Now find the user by their email address
	let user = await User.findOne({ username: req.body.username });
	if (!user) {
		return res.status(206).send('Incorrect username or password.');
	}

	// Then validate the Credentials in MongoDB match
	// those provided in the request
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) {
		return res.status(204).send('Incorrect email or password.');
	}
	const token = jwt.sign(
		{ _id: user._id, username: user.username },
		accessTokenKey,
		{ expiresIn: '60s' }
	);
	loginStatus = true;
	var decoded_token = jwt_decode(token);
	res.status(200).json({
		success: true,
		err: null,
		exp: decoded_token.exp,
		token,
		loginStatus,
	});
});

router.get('/', (req, res) => {
	res.send('hello');
});

module.exports = router;
