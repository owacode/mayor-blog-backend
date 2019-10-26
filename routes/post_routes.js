const express= require('express');
const routes= express.Router();
const upload=require('./multer');
const cloudinary =require('cloudinary');
const cloudinarydetail=require('./cloudinary');
// Controllers
const adderController= require('./controller/adder');
const deleteController= require('./controller/delete');
const updateController= require('./controller/update');
const fetchController= require('./controller/fetch');


routes.post('/addimage', upload.single('image') ,async(req,res)=>{
  console.log('hittttttttttttt',req.file);
  const result= await cloudinary.v2.uploader.upload(req.file.path)
  .catch((err)=>{
      new Promise(() => { throw new Error('exception!'); });
          console.log(err);
  })
  const imagepath=result.url;
  console.log('image added to db',imagepath);
    res.json({
      imagepath:imagepath,
      msg:"Image Added successfully"
    })
})
// Route for UnApproved BLogs
routes.post('/unapproved-blog', upload.single('image') ,async(req,res)=>{
  const result= await cloudinary.v2.uploader.upload(req.file.path)
  .catch((err)=>{
      new Promise(() => { throw new Error('exception!'); });
          console.log(err);
  })
  const imagepath=result.url;
  req.body.imageurl=imagepath;
  adderController.addNewBlogToUnApproved(req.body)
  .then(result=>
    {
      // adderController.addBlogToMain(result);
      res.status(200).json({
      status:"success",
      msg:"Blog is send for verification you will be respond back in 24 hours",
      payload:result
  })})
  .catch(err =>res.status(200).json({
    status:"error",
    payload:err
  }));
})

// Route for Approving the BLogs
routes.post('/approve-blog', (req, res)=>{
  console.log(req.body);
  const id={
    mainid:req.body.mainid
  }
    adderController.addNewBlogToApproved(req.body)
    .then(result =>{
      id.approveid=result._id;
      updateController.approveBlog(id);
      res.status(200).json({
        status:"success",
        msg:"Blog is Approved",
        payload:result
      })
    })
    .catch(err =>res.status(200).json({
      status:"error",
      payload:err
    }));
})

// Route for Rejecting the BLogs
routes.post('/reject-blog', (req, res)=>{
  deleteController.deleteUnapprovedBlog(req.body.id)
  .then(result=>{{
   return updateController.rejectBlog(req.body);
  }})
  .then((result)=>res.status(200).json({
    status:"success",
    msg:"Blog Rejected"
  }))
    .catch(err =>res.status(200).json({
      status:"error",
      payload:err
    }));
})

// Route for UnApproved Author Profile
routes.post('/unapproved-author', upload.single('image') ,async(req,res)=>{
  const result= await cloudinary.v2.uploader.upload(req.file.path)
  .catch(err =>{
    new Promise(()=>{ throw new Error('exception!'); });
    console.log(err);
  })
  const imagepath= result.url;
  req.body.imageurl=imagepath;
  adderController.addUnApprovedAuthor(req.body)
  .then(result=> {
    // adderController.addAuthorToMain(result);
    res.status(200).json({
    status:"success",
    msg:"Profile is send for verification you will be respond back in 24 hours"
  })})
  .catch(err =>res.status(200).json({
    status:"error",
    payload:err
  }));
})

// Route for Approving Author Profile
routes.post('/approve-author', (req, res)=>{
  const id={
    mainid:req.body.mainid
  }
  adderController.addApprovedAuthor(req.body)
  .then(result =>{
    console.log(result._id,'idddddddd');
    id.approveid=result._id;
    console.log(id,'dfdsf');
    updateController.approveAuthor(id);
    res.status(200).json({
      status:"success",
      msg:"Author Profile is Approved",
      result:result
    })
  })
  .catch(err =>res.status(200).json({
    status:"error",
    payload:err
  }));
})

// Route for Rejecting the Author Profile
routes.post('/reject-author', (req, res)=>{
  console.log(req.body,'body');
  deleteController.deleteUnapprovedAuthor(req.body.id)
  .then(result => {
    updateController.rejectAuthorProfile(req.body)
    res.status(200).json({
    status:"success",
    msg:"Author Profile Rejected"
  })})
  .catch(err =>res.status(200).json({
    status:"error",
    payload:err
  }));
})
module.exports= routes;
