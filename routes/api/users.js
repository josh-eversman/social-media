const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// @route POST api/users

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include valid email').isEmail(),
  check('password', 'Please enter password >6 ').isLength({min:6})
],(req, res)=> {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  console.log(req.body);
  res.send('In users');
})

module.exports = router;
