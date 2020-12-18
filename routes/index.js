var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({"Error" : "Please Use the Front End to navigate through this API"});
});

module.exports = router;
