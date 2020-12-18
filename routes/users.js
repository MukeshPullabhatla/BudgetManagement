const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	// Check if this user already exisits
	let user = await userModel.findOne({ username: req.body.username });
	if (user) {
		return res.status(400).send('That user already exists!');
	} else {
		// Insert the new user if they do not exist yet
		user = new userModel({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
		await user.save();
		res.send(user);
	}
});

router.get('/', async (req, res) => {
	userModel
		.find({})
		.then((data) => {
			console.log(data);
			res.status(200).send(data);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send();
		});
});

module.exports = router;
