const express=require('express');
const app=express();
const connectDB=require('./config/db');
const route=require('./routes/files');
const path=require('path');
const cors =require('cors');

connectDB();
const PORT=process.env.PORT | 4000;
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view-engine','hbs');
app.use(cors());
app.use('/api/files',route);
app.use('/files',route);
app.use('/files/download',require('./routes/download'));
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})