const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body);

  res.status(200).send('success');
});

module.exports = router;
