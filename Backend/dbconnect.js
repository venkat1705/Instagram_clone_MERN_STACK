const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('DB Connected Successfully');
    }).catch(err=>console.log(err));
}

module.exports = dbConnect;