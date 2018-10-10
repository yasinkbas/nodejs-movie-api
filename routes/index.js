const express = require('express');
const router = express.Router();

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
   * this mean is username = username, password = password
   * this comed with ecmascript
   */
  const user = new User({
    username,
    password
  })
  const promise = user.save()
  promise.then((data) =>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
});

module.exports = router;
