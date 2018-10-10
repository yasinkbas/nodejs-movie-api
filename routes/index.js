const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Models
const User = require('../models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * this func is for register
 * @returns user data 
 */
router.post('/register', function(req, res, next) {
  const {username, password} = req.body

  /**
   * this is bcrypt module
   * enctypting password
   */
  bcrypt.hash(password,10).then((hash) =>{
    // Store hash in your password DB

  /**
   * old :this mean is username = username, password = password
   * new : hash assigned to password
   * this comed with ecmascript
   */
    const user = new User({
      username,
      password: hash
    })
    const promise = user.save()
    promise.then((data) =>{
      res.json(data)
    }).catch((err)=>{
      res.json(err)
    })
  })
});

router.post('/authenticate',(req,res) => {
  const { username, password} = req.body
  User.findOne({
    username: username, // find username in db
  }, (err,user)=>{
    if (err)
    throw err
  
    if(!user){
      res.json({
        status : false,
        message: 'Authentication failed, user not found'
      })
    }else{ // if there is username in db
      bcrypt.compare(password,user.password).then((result)=>{
        if (!result){ // if password not true
          res.json({
            status: false,
            message: 'Authentication failed, wrong password'
          })
        }else{ // if password true
          const payload = { // define payload
            username
          }
          const token = jwt.sign(payload, req.app.get('api_secret_key'),{ //create token
            expiresIn: 720 // dakika cinsinden 12 saat kullanilabilme izni
          })

          res.json({ // write token and status
            status: true,
            token
          })
        }
      })
    }
  })
  
})

module.exports = router;
