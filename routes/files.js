const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require('path');
const File = require('../model/file');
const { v4: uuid4 } = require('uuid');
const hbs = require('hbs');
const cors =require('cors');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniquename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniquename);
    }
})
let upload = multer({
    storage: storage,
    limit: { fileSize: 1024 * 1024 * 100 }
}).single('myfile');

route.post('/', (req, res) => {
    // store file
    upload(req, res, async (err) => {
        if (!req.file) {
            return res.json({ error: "All fields are required" });
        }
        if (err) {
            return res.status(500).send({ error: err.message })
        }
        // store database
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        })
        const response = await file.save();
        console.log(response);
        return res.status(200).json({file:`http://localhost:4000/files/${response.uuid}`});
    });
});

// for get
route.get('/:uuid',async(req,res)=>{
    try{
    const fetch=await File.findOne({uuid:req.params.uuid});
      res.render('download.hbs',{
          uuid:fetch.uuid,
          filename:fetch.filename,
          filesize:(fetch.size/(1024*1024)).toFixed(2),
          download:`http://localhost:4000/files/download/${fetch.uuid}`
      });
    }
    catch(err)
    {
         res.render('download.hbs',{uuid:"Something went wrong"});
    }

});

module.exports = route;