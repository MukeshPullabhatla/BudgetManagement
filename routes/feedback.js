const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const feedbackModel = require('../models/feedbackModel');
const exjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
router.use(cors());

const secretKey = 'My super secret key';
const jwtMW = exjwt({
	secret: secretKey,
	algorithms: ['HS256'],
});

router.get('/', jwtMW, (req, res) => {
	feedbackModel
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

router.post('/', jwtMW, async (req, res) => {
	console.log('inside feedback post');
	console.log(req.body);

	feedbackinfo = new feedbackModel({
		username: req.body.username,
		description: req.body.description,
		email: req.body.email,
	});

	await feedbackinfo.save();
	res.send(feedbackinfo);
});

module.exports = router;
