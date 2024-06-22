const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser=require('../midelware/Fetchuser')
var secKey = "good$"

router.post('/createUser', [   //this route for creating the user 
  body('name', 'enter the valid name').isLength({ min: 3 }),
  body('email', 'enter the valid email').isEmail(),
  body('password', 'enter the valid passowrd').isLength({ min: 5 })
],
  async (req, res) => {   // this is the route  handler here it as a callback function get req,res as a prameter 
    //check the validation here 
    let sucess=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {


      // Check if the user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({sucess,error: 'Sorry, a user already exists' });
      }
      // generating the hasing here 
      var salt = bcrypt.genSaltSync(10);
      var hashPassword = await bcrypt.hash(req.body.password, salt);
        // it return the promeses so we are use await here 
      user = await User.create({
        name: req.body.name,
        email: req.body.email,             //creating the user here 
        password: hashPassword,
      });
      const data = {
        user: {
          id: user.id
        }
      }

      var secKey = "good$"
      const token = jwt.sign(data , secKey);
      console.log('token send succesfully ');    //here is create the token with secreate key 
      sucess=true;
      res.json({sucess, token }) //send the sucesss key into the res
    } catch (error) {
      console.error(error);
      res.status(500).send("internal server error")
    }
  });

//create the login 
router.post('/SignIn', [
  body('email', 'enter the valid email').isEmail(),
  body('password', 'enter the valid passowrd').exists()
],
  async (req, res) => { 
    let sucess=false;  // this is the route  handler here it as a callback function get req,res as a prameter 
    //check the validation here 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;  //destructure here email and password from the http request 

    try {
      const user = await User.findOne({ email })
      if (!user) {
        sucess=false;
        return res.status(400).json({ error: "enter correct validation" })  //why i am telling to the client user is dosent exist 
      }
      const passwordCompare = await bcrypt.compare(password, user.password)  //i compare the two passwoed here
      if (!passwordCompare) {
        sucess=false;
        return res.status(400).json({ error: "enter correct password" })
      }
      // signin token 
       const data = {
        user: {
          id: user.id
        }
      }
      sucess=true;
      console.log("from signIn",user.id);
      const token = jwt.sign( data , secKey);
      console.log('token send succesfully ');    //here is create the token with secreate key 
      res.json({sucess,token })

    } catch (error) {
      console.error(error);
      res.status(400).send("internal server error")
    }
  })


router.get('/getuser', fetchuser, async (req, res) => {
  try {
   let  userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router

