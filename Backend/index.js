const express = require('express');
const app = express();
const dotenv = require('dotenv');
require('./dbconnect')();
const authRouter = require('./routes/auth');
const router = require('./routes/user');
const postRouter = require('./routes/posts');
dotenv.config();

app.use(express.json());
app.use("/api/users",authRouter)
app.use("/api/users",router);
app.use("/api/posts",postRouter);



app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
});


