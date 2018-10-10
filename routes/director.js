const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

// Models
const Director = require('../models/Director')

/**
 * this post function of director url(/api/directors)
 */
router.post('/', (req, res, next) => {
    const director = new Director(req.body)
    const promise = director.save()

    promise.then((data)=>{
        res.json(data)
    }).catch((err) =>{
        res.json(err)
    });
});



/**
 * listing directors and joining in mongodb like mysql
 */

router.get('/',(req,res)=>{
    const promise = Director.aggregate([
        /**
         * for join task
         * this directorId in Directors will matches _id in Movies
         * and this will assign to movies variable
         */
        {
            $lookup: {
                from: 'moviews',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        /**
         * we need the data use below that 
         * we need to attribute this unwind
         * @param preserveNullAndEmptyArrays: herhangi bir data ile eslesmese bile 
         * o directoru gondermesini saglar
         */
        {
            $unwind: {
                path : '$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        /**
         * we need to group them
         * because one director can have two movie but these will be shown separately
         * but we want to these shown with groups under the one person
         */
        {
            $group:{
                _id : {
                    _id : '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                /**
                 * we need the push this group to under the movies param
                 */
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            /**
             * we weant to delete super.id because we have two id 
             * we assigned these to id
             */
            $project: {
                _id : '$_id._id',
                name: '$_id.name',
                surname: '$_id_surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })
})

router.get('/:director_id',(req,res)=>{
    const promise = Director.aggregate([
        /**
         * we want to only person data in here
         * but this returns object we resolve this problem with used a mongoose's method Types.ObjectId
         */
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        /**
         * for join task
         * this directorId in Directors will matches _id in Movies
         * and this will assign to movies variable
         */
        {
            $lookup: {
                from: 'moviews',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        /**
         * we need the data use below that 
         * we need to attribute this unwind
         * @param preserveNullAndEmptyArrays: herhangi bir data ile eslesmese bile 
         * o directoru gondermesini saglar
         */
        {
            $unwind: {
                path : '$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        /**
         * we need to group them
         * because one director can have two movie but these will be shown separately
         * but we want to these shown with groups under the one person
         */
        {
            $group:{
                _id : {
                    _id : '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                /**
                 * we need the push this group to under the movies param
                 */
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            /**
             * we weant to delete super.id because we have two id 
             * we assigned these to id
             */
            $project: {
                _id : '$_id._id',
                name: '$_id.name',
                surname: '$_id_surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })
})

/**
 * provides to change director id attributes
 */

router.put('/:director_id',(req,res,next) =>{
    const promise = Director.findByIdAndUpdate(
      req.params.director_id,
      req.body,
      {new : true} // geriye yeni degeri dondurur
      )
  
    promise.then((director)=>{
      if (!director)
        next({message: 'The director was not found'});
      res.json(director)
    }).catch((err)=>{
      res.json("The director was not found")
    })
  });

/**
 * delete director in database 
 * @returns status 1 
 */

  router.delete('/:director_id',(req,res,next) =>{
    const promise = Director.findByIdAndRemove(req.params.director_id)
  
    promise.then((director)=>{
      if (!director)
        next({message: 'The director was not found'});
      res.json({status: 1})
    }).catch((err)=>{
      res.json("The director was not found")
    })
  });


module.exports = router;
