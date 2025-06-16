const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    if(req.headers.authorization!==undefined){
       let token = req.headers.authorization.split(' ')[1]
       jwt.verify(token,"yug180234",(err,info)=>{
        if(!err){
            next()
        }
        else{
            res.send({message:"Invalid Token"})
        }
       })
    }
    else{
        res.send({message:"Please Send a Token"})
    }
}

module.exports=verifyToken;