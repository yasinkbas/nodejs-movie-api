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



module.exports = router;
