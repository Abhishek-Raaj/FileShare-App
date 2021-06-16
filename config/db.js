require('dotenv').config();
const mongoose=require("mongoose");

function connectDB()
{
    const url=process.env.MONGO_CONNECTION_URL;

    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }).
    then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log(err.message)});     
    }
  
module.exports =connectDB;
