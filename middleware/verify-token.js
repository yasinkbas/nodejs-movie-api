const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    /*************************************************************************
     * @param req.query.token : localhost:3000/api/movies?token=<tokendata>  *
     * @param req.body.token : post                                          *
     * @param req.headers['x-access-token'] : get headers                    *
     *************************************************************************/
    const token = req.headers['x-access-token'] || req.body.token || req.query.token

    if(token){
        jwt.verify(token,req.app.get('api_secret_key'),(err,decoded)=>{
            if (err){
                res.json({
                    status: false,
                    message: 'Failed to authenticate token'
                })
            }else{
                req.decode = decoded
                next()
            }
        })
    }else{
        res.json({
            status: false,
            message: 'No token provided'
        })
    }

}