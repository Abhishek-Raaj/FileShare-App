require('dotenv').config();
const mongoose=require("mongoose");

function connectDB()
{
    const url=process.env.MONGO_CONNECTION_URL;
//   const url="mongodb+srv://share:Okkl0NGc48x7K0QJ@cluster0.0iqnd.mongodb.net/fileshared?retryWrites=true&w=majority";
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }).
    then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log(err.message)});     
    }
  
module.exports =connectDB;