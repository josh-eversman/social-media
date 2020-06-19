const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');
const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
// @route POST api/users

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include valid email').isEmail(),
  check('password', 'Please enter password >6 ').isLength({min:6})
], async (req, res)=> {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
 const {name, email, password} = req.body;

 try{
   let user = await User.findOne({email});
   if(user){
     return res.status(400).send('user not found')
   }
   const avatar = gravatar.url(email, {
     s: '200',
     r: 'pg',
     d: 'mm'
   });

    user = new User({
      name,
      email,
      avatar,
      password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload ={
      user: {
        id: user._id
      }
    };

    jwt.sign(payload,
      config.get('jwt'),
      {expiresIn:360000},
      (error, token)=>{
      if(error) throw error;
      res.json({token});
    });
   //verify user
   //return user profile
   //encrypt password
   //json webtoken as user should logged in after registration.
     console.log(req.body);

 }catch(err){
   console.log("the error is "+ err.message);
   res.status(500).send('SERVER ERROR!')
   res.send("USER already exists!")
 }

})

module.exports = router;
