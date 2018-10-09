const express = require('express');
const router = express.Router();

// Models 
const Movie = require('../models/Movie');

/* Post users listing. */
router.post('/', function(req, res, next) {
  // const {title, imdb_score, category, country, year} = req.body;
  
  // const movie = new Movie({
  //   title: title,
  //   imdb_score: imdb_score,
  //   category: category,
  //   country: country,
  //   year: year
  // });

  const movie = new Movie(req.body)


  movie.save((err,data)=>{
    if (err)
      res.json(err)
    else
      res.json({status : 1})
  })
});

module.exports = router;
