const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');
dotenv.config();

module.exports = (req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(404).json({error: 'User must be logged in'})
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,payload)=>{
        if(err){
            return res.status(500).json({error:"User must be logged in"});
        }
        const {_id} = payload;
        User.findById(_id).then(userdata=>{
            req.user = userdata;
            next();
        })
    })
}