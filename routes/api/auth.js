const express = require('express');
const router = express.Router();

// @route GET api/auth
// access Public
router.get('/', (req, res)=> {
  res.send('In auth');
})

module.exports = router;
