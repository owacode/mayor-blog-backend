const express= require('express');
const route= express.Router();
const upload=require('./multer');
const cloudinary =require('cloudinary');
const cloudinarydetail=require('./cloudinary');
const Blog= require('../model/blog');

route.post('/blog', upload.single('image') ,async(req,res)=>{

  const result= await cloudinary.v2.uploader.upload(req.file.path)
  .catch((err)=>{
      new Promise(() => { throw new Error('exception!'); });
          console.log(err);
  })
  const imagepath=result.url;
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  var currentTime = new Date();

  var currentOffset = currentTime.getTimezoneOffset();

  var ISTOffset = 330;   // IST offset UTC +5:30

  var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

  // ISTTime now represents the time in IST coordinates

  var hoursIST = ISTTime.getHours()
  var minutesIST = ISTTime.getMinutes()

  const blog = new Blog({
    title:req.body.title,
    category:req.body.category,
    dateadded:date,
    desc:req.body.desc,
    image:imagepath
  })

  blog.save()
  .then(response=>{
    res.status(200).json({
      msg:"Blog Added Successfully"
    })
  })
  .catch(error=>{
    res.status(401).json({
      msg:"Blog Not Added",
      err:error
    })
  })
})

route.get('/blog',(req,res)=>{
  Blog.find({})
  .then(response=>{
    res.status(200).json({
      msg:"Blog Fetch Successfully",
      blog:response
    })
  })
})

route.delete('/blog/:id',(req,res)=>{
  Blog.findByIdAndDelete({_id:req.params.id})
  .then(response=>{
    res.status(200).json({
      msg:"Blog Deleted"
    })
  })
})

route.get('/blog/:id',(req,res)=>{
  Blog.find({_id:req.params.id})
  .then(response=>{
    res.status(200).json({
      msg:"Blog Fetch Successfully",
      blog:response
    })
  })
})

route.patch('/blog/:id', upload.single('image') ,async(req,res)=>{

  const result= await cloudinary.v2.uploader.upload(req.file.path)
  .catch((err)=>{
      new Promise(() => { throw new Error('exception!'); });
          console.log(err);
  })
  const imagepath=result.url;

  const blog = new Blog({
    _id:req.params.id,
    title:req.body.title,
    category:req.body.category,
    dateadded:req.body.date,
    desc:req.body.desc,
    image:imagepath
  })

  blog.save()
  .then(response=>{
    res.status(200).json({
      msg:"Blog Updated Successfully"
    })
  })
  .catch(error=>{
    res.status(401).json({
      msg:"Blog Not Updated",
      err:error
    })
  })
})
module.exports= route;

