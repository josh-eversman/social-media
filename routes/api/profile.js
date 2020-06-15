const express = require('express');
const router = express.Router();

router.get('/api/profile', (req, res)=> {
  res.send('In profile');
})

module.exports = router;
