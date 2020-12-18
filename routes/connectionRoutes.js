var express = require('express');
var router = express.Router();
let {getConnection, getConnections, addConnection} = require("../models/ConnectionDB");

router.get('/all', async (req, res) => {
  let data = await getConnections();
  res.status(200).send(data)
});

router.get('/:id', async (req, res) => {
  let id = req.params.id;
  let reqObject = await getConnection(id);
  if(typeof reqObject === 'undefined') {
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
  res.status(404).send({Error: 'Sorry you reached a dead end.'})
});

module.exports = router;
