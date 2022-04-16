const express = require('express');
const requirelogin = require('../middlewares/requirelogin');
const Post = require('../models/post');

const postRouter = express.Router();

//create post
postRouter.post('/createPost',requirelogin, (req,res) => {
    const {title,body,pic} = req.body;
    if(!title || !body || !pic){
        return res.status(500).json({error: 'All fields are required'})
    }
    req.user.password = undefined;
    const post =  new Post({title, body, pic, postedBy: req.user});
    post.save().then(() => {
        res.json({post: post});
    }).catch(err => {
        console.log(err);
    })
})
//get post 
postRouter.get('/myposts',requirelogin,(req, res) => {
    Post.find({postedBy:req.user._id}).populate("postedBy","_id name").then(result => {res.json({user:req.user,myposts:result});
    }).catch(err => {
        console.log(err);
    })
})

//get all posts

postRouter.get('/allposts',requirelogin,(req, res) => {
    Post.find().populate("postedBy","_id name").then(result => {
        res.json({posts:result});
    }).catch(err => {
        console.log(err);
    });
});

//like the post 
postRouter.put('/like',requirelogin,(req, res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true,
    }).exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result);
        }
    })
})
//unlike the post 
postRouter.put('/unlike',requirelogin,(req, res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true,
    }).exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result);
        }
    })
})

//user comment for post
postRouter.put('/comment',requirelogin,(req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true,
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result);
        }
    })
})

//delete user posts
postRouter.delete('/delete/:postId',requirelogin,(req,res) => {
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post) => {
        if(err || !post){
            return res.status(422).json({error:err});
        }
        if(post.postedBy._id.toString() === req.user._id.toString()) {
            post.remove().then(result=>{
                res.json(result)
            }).catch(err => {
                console.log(err);
            })
        }
    })
});
module.exports = postRouter;