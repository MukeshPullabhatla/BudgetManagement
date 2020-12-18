const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
let {
	getConnection,
	getConnections,
	addConnection,
} = require('../models/ConnectionDB');
const exjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
router.use(cors());

const secretKey = 'My super key';

const jwtMW = exjwt({
	secret: secretKey,
	algorithms: ['HS256'],
});

router.get('/all', async (req, res) => {
	let data = await getConnections();
	res.status(200).send(data);
});

router.get('/:id', jwtMW, async (req, res) => {
	let id = req.params.id;
	let reqObject = await getConnection(id);
	if (typeof reqObject === 'undefined') {
		res.status(404).send(reqObject);
	} else {
		res.status(200).send(reqObject);
	}
});

router.post('/addevent', async (req, res) => {
	let GetConnection = await addConnection(req.body);
	res.status(202).send(GetConnection);
});

router.get('/', async (req, res) => {
	let data = await getConnections();
	res.status(404).send({ Error: 'Sorry you reached a dead end.' });
});

module.exports = router;
