const express = require('express');
const User = require('../models/user');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

//Signup
authRouter.post('/signup',  (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email ||!password) {
        return res.status(422).json({error: 'All feilds are required'})
    }
    User.findOne({email}).then((saveduser)=>{
        if(saveduser){
            return res.status(422).json({error:'User with this email already exists'})
        }
        const user = new User({
            email,password,name
        });
        user.save().then(user => {
            res.json({message:'User Created Successfully'})
        }).catch(err => {
            console.error(err)
        })
    })
})
//Login

authRouter.post('/login',(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(500).json({error: 'All feilds are required'})
    }
    User.findOne({email}).then(saveduser=>{
        if(!saveduser){
            return res.status(422).json({error: 'Invlid email or password'})
        }
        saveduser.ispassword(password).then(doMatch=>{
            if(doMatch){
                let token = jwt.sign({_id:saveduser._id},process.env.JWT_SECRET_KEY)
                const {_id,name,email} = saveduser;
                res.json({token,user:{_id,name,email}})
            }
            else{
                res.status(422).json({error: 'Invlid email or password'})
            }
        }).then(err => {
            console.log(err);
        })
    }).then(err => {console.log(err);})
})

module.exports = authRouter;