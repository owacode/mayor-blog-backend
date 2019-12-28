const express = require('express');
const routes = express.Router();
// Controllers
const adderController = require('./controller/adder');
const deleteController = require('./controller/delete');
const updateController = require('./controller/update');
const fetchController = require('./controller/fetch');

// Route for Getting Videos
routes.get('/video', (req, res) => {
  console.log('hit video')
  fetchController.getVideo()
    .then((result) => res.status(200).json({
      status: "success",
      msg: "Video Fetch",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting Videos by Author
routes.get('/singlevideo/:email', (req, res) => {
  console.log('hit videoooo', req.params.email)
  fetchController.getAuthorVideo(req.params.email)
    .then((result) => res.status(200).json({
      status: "success",
      msg: "Single Video Fetch",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting Videos by Author
routes.get('/video/:id', (req, res) => {
  console.log('hit videoooo', req.params.id)
  fetchController.getSingleVideo(req.params.id)
    .then((result) => res.status(200).json({
      status: "success",
      msg: "Single Video Fetch",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Home Blogs
routes.get('/homeblog', (req, res) => {
  fetchController.getHomeBlogs(req.body)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Home Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Home Blogs
routes.get('/homeblog/:id', (req, res) => {
  fetchController.getHomeSingleBlogs(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Home Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting All Approved Blogs
routes.get('/approveblogs', (req, res) => {
  fetchController.getApprovedBlogs(req.body)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting All Approved Blogs
routes.get('/category/:cat', (req, res) => {
  fetchController.getCategoryApprovedBlogs(req.params.cat)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting All Not Approved Blogs
routes.get('/notblogs', (req, res) => {
  fetchController.getNotApprovedBlogs()
    .then(result => res.status(200).json({
      status: "success",
      msg: "NotApproved Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting All Blogs
routes.get('/allblogs', (req, res) => {
  fetchController.getAllBlogs(req.body)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting a allBlogs
routes.get('/allblogs/:id', (req, res) => {
  fetchController.getSingleAllBlogs(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})


// Route for Getting Single NOtApprovedBlog Authors
routes.get('/singlenotappblog/:id', (req, res) => {
  fetchController.getSingleNotApprovedBlog(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Single NotApproved Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting Single ApprovedBlog Authors
routes.get('/singleappblog/:id', (req, res) => {
  console.log(req.params, 'dwdnwklnkw');
  fetchController.getSingleApprovedBlogs(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Single Approved Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

routes.get('/authorapprovedblogs/:id', (req, res) => {
  console.log(req.params, 'kksnkk')
  fetchController.getApprovedBlogsByAuthor(req.params.id)
    .then(result => {
      res.json({
        status: "success",
        msg: "Blogs by Author Fetch Successfully",
        result: result
      })
    })
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

routes.get('/authorunapprovedblogs/:id', (req, res) => {
  console.log(req.params, 'kksnkk')
  fetchController.getUnapprovedBlogsByAuthor(req.params.id)
    .then(result => {
      res.json({
        status: "success",
        msg: "Blogs by Author Fetch Successfully",
        result: result
      })
    })
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

routes.get('/authorallblogs/:id', (req, res) => {
  console.log(req.params, 'kksnkk')
  fetchController.getAllBlogsByAuthor(req.params.id)
    .then(result => {
      res.json({
        status: "success",
        msg: "Blogs by Author Fetch Successfully",
        result: result
      })
    })
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})
/*<-------------------------------------------------######Blogs Routes End######--------------------------------------------------->*/
// Route for Getting All Not Approved Authors
routes.get('/notauthor', (req, res) => {
  fetchController.getNotApprovedAuthor()
    .then(result => res.status(200).json({
      status: "success",
      msg: "NotApproved Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting Single Not Approved Author
routes.get('/notauthor/:id', (req, res) => {
  fetchController.getSingleNotApprovedAuthor(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Single NotApproved Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting All Approved Authors
routes.get('/approvedauthor', (req, res) => {
  fetchController.getApprovedAuthor()
    .then(result => res.status(200).json({
      status: "success",
      msg: "Approved Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting Single Approved Author
routes.get('/approvedauthor/:id', (req, res) => {
  fetchController.getSingleApprovedAuthor(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Approved Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting All Authors
routes.get('/allauthor', (req, res) => {
  fetchController.getAllAuthor()
    .then(result => res.status(200).json({
      status: "success",
      msg: "All Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting All Authors
routes.get('/allauthor/:id', (req, res) => {
  fetchController.getSingleAllAuthor(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Single All Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})


module.exports = routes;
