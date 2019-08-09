const express= require('express');
const route= express.Router();
const upload=require('./multer');
const cloudinary =require('cloudinary');
const cloudinarydetail=require('./cloudinary');
const Blog= require('../model/blog');

//Posting a New Blog
route.post('/blog', upload.single('image') ,async(req,res)=>{

  const result= await cloudinary.v2.uploader.upload(req.file.path)
  .catch((err)=>{
      new Promise(() => { throw new Error('exception!'); });
          console.log(err);
  })
  const imagepath=result.url;
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  const blog = new Blog({
    title:req.body.title,
    category:req.body.category,
    dateadded:date,
    desc:req.body.desc,
    comments:[],
    image:imagepath
  })

  blog.save()
  .then(response=>{
    res.status(200).json({
      msg:"Blog Added Successfully",
      response:response
    })
  })
  .catch(error=>{
    res.status(401).json({
      msg:"Blog Not Added",
      err:error
    })
  })
})

//Get all the Blogs
route.get('/blog',(req,res)=>{

  const query= Blog.find();
  const pagesize= +req.query.pagesize;
  const currentpage= +req.query.currentpage;
  let fetchblogs;
  if(pagesize && currentpage){
    query
    .skip(pagesize * (currentpage -1))
    .limit(pagesize);
  }
  query
  .then(documents=>{
    // console.log(documents)
    fetchblogs=documents;
    return Blog.count();
  })
  .then(totalBlogs=>{
    res.json({msg:"Blog Fetch Successfully",blog:fetchblogs, totalBlogs:totalBlogs})
  })


  // Blog.find({})
  // .then(response=>{
  //   res.status(200).json({
  //     msg:"Blog Fetch Successfully",
  //     blog:response
  //   })
  // })
})

//Get a particular Blog
route.get('/blog/:id',(req,res)=>{

  Blog.find({_id:req.params.id})
  .then(response=>{
    res.status(200).json({
      msg:"Blog Fetch Successfully",
      blog:response
    })
  })
})

//Delete a particular Blog
route.delete('/blog/:id',(req,res)=>{
  Blog.findByIdAndDelete({_id:req.params.id})
  .then(response=>{
    res.status(200).json({
      msg:"Blog Deleted"
    })
  })
})

//Update a particular Blog
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

//Comment on a Blog

route.post('/blogComment/:id',(req,res)=>{

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  const comment={
    userid:req.body.userid,
    username:req.body.username,
    comment:req.body.comment,
    dateadded:date,
    like:0
  }

  Blog.update(
    { _id: req.params.id},
    { $addToSet: { comments: comment} }
 )
 .then(response=>res.json({response:response}));

})

//Like a comment of a particular Blog
route.post('/likeComment/:id',(req,res)=>{

  Blog.update(
    { _id: req.params.id, "comments.userid":req.body.commentid},
    { $inc: { "comments.$.like": 1 } }
 )
 .then(response=>res.json({response:response}));

})
module.exports= route;

