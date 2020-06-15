const express = require('express');
const router = express.Router();

// @route POST api/post

router.post('/', (req, res)=> {
  console.log(req.body);
  res.send('In posts');
});

module.exports = router;
