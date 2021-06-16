const express = require('express');
const route = express.Router();
const File = require('../model/file');

route.get('/:uuid',async(req,res)=>{
    try{
        // res.send(req.url);
      
    const fetch2=await File.findOne({uuid:req.params.uuid});
    //   res.render('download.hbs',{
    //       uuid:fetch.uuid,
    //       filename:fetch.filename,
    //       filesize:fetch.size/1024,
    //       download:`http://localhost/4000/files/download/${fetch.uuid}`
    //   });
    const filepath=`${__dirname}/../${fetch2.path}`;
    // console.log(fetch2);
    res.download(filepath);
    }
    catch(err)
    {
        return res.render('download.hbs',{error:"Something went wrong"});
    }

});

module.exports = route;