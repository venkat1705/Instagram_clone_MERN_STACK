const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {ObjectId} = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
},{timestamps:true});

userSchema.pre('save', async function(next) {
    const salt  = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.ispassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password);
}

const User = mongoose.model('User',userSchema);
module.exports = User;