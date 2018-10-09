const express = require('express');
const router = express.Router();

// Models 
const Movie = require('../models/Movie');

/* Post users listing. */
router.get('/',(req,res)=>{
  const promise = Movie.find({ })
  promise.then((data) =>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})
router.post('/', function(req, res, next) {
  // const {title, imdb_score, category, country, year} = req.body;
  
  // const movie = new Movie({
  //   title: title,
  //   imdb_score: imdb_score,
  //   category: category,
  //   country: country,
  //   year: year
  // });
  
// alternative to up version:
  const movie = new Movie(req.body)



  // movie.save((err,data)=>{
  //   if (err)
  //     res.json(err)
  //   else
  //     res.json({status : 1})
  // }) 
  
  // alternative to up version:
  const promise = movie.save()
  promise.then((data)=>{
    res.json({status: 1})
  }).catch((err)=>{
    res.json(err)
  })

});

router.get('/:movie_id',(req,res,next) =>{
  const promise = Movie.findById(req.params.movie_id)

  // res.send(req.params.movie_id) // eger direk olarak eq.params.movie_id dersek direk o degeri yazacak
  promise.then((movie)=>{
    if (!movie)
      next({message: 'The movie was not found'});
    res.json(movie)
  }).catch((err)=>{
    res.json("The movie was not found")
  })
});


/*
 * gelen deger ile veriyi eslestirip put seklinde gelen data ile o buldugu veriyi degistirecek
 * ve deger olarak eski veriyi dondurur
 * @desc changing data with by id and update
 */

router.put('/:movie_id',(req,res,next) =>{
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {new : true} // geriye yeni degeri dondurur
    )

  // res.send(req.params.movie_id) // eger direk olarak eq.params.movie_id dersek direk o degeri yazacak
  promise.then((movie)=>{
    if (!movie)
      next({message: 'The movie was not found'});
    res.json(movie)
  }).catch((err)=>{
    res.json("The movie was not found")
  })
});

/*
 * gonderilen id'deki datayi veritabanindan siler
 * @desc deleting this data in db
 */

router.delete('/:movie_id',(req,res,next) =>{
  const promise = Movie.findByIdAndRemove(req.params.movie_id)

  // res.send(req.params.movie_id) // eger direk olarak eq.params.movie_id dersek direk o degeri yazacak
  promise.then((movie)=>{
    if (!movie)
      next({message: 'The movie was not found'});
    res.json({status: 1})
  }).catch((err)=>{
    res.json("The movie was not found")
  })
});

module.exports = router;
