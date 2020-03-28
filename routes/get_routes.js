const express = require('express');
const routes = express.Router();
let apicache = require( 'apicache');
let cache = apicache.middleware;
let c=require("./middleware/cache.js")
// Controllers
const adderController = require('./controller/adder');
const deleteController = require('./controller/delete');
const updateController = require('./controller/update');
const fetchController = require('./controller/fetch');

// Route for Getting All Blogs
routes.get('/allblogs',c.g,c.s, (req, res) => {
  fetchController.getAllBlogs()
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

// Route for Getting a AllBlogs
routes.get('/allblogs/:id',c.g,c.s, (req, res) => {
  console.log(req.params.id,'idd');
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

routes.get('/allmayorblogs/:id',c.g,c.s, (req, res) => {
  console.log(req.params, 'kksnkk')
  fetchController.getAllBlogsByMayor(req.params.id)
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

// Route for Getting All Not Approved Blogs from not approved collections
routes.get('/notapprovedblogs',c.g,c.s, (req, res) => {
  fetchController.getAllNotApprovedBlogs()
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

// Route for Getting All Not Approved Blogs from not approved collections
routes.get('/notapprovedblogs/:id',c.g,c.s, (req, res) => {
  fetchController.getSingleNotApprovedBlog(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "NotApproved Single Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})
routes.get('/notapprovedblogsbymayor/:id',c.g,c.s, (req, res) => {
  console.log(req.params, 'not app by mayor')
  fetchController.getUnapprovedBlogsByMayor(req.params.id)
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

// Route for Getting All Approved Blogs
routes.get('/approveblogs',c.g,c.s, (req, res) => {
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

// Route for Getting All Category Wise Blogs
routes.get('/category/:cat',c.g,c.s, (req, res) => {
  fetchController.getCategoryApprovedMayorBlogs(req.params.cat)
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

// Route for Getting a saved blogs by author
routes.get('/mayorsavedblogs/:id',c.g,c.s, (req, res) => {
  console.log(req.params.id)
  fetchController.getMayorSavedBlogs(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Saved Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting a saved blogs by author
routes.get('/singlemayorsavedblog/:id',c.g,c.s, (req, res) => {
  console.log(req.params.id)
  fetchController.getSingleMayorSavedBlog(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Single Saved Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting Single NotApprovedLeaderBlog Authors
routes.get('/singlenotappblog/:id',c.g,c.s, (req, res) => {
  fetchController.getSingleNotApprovedMayorBlog(req.params.id)
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

// Route for Getting Single ApprovedLeaderBlog Authors
routes.get('/singleappblog/:id',c.g,c.s, (req, res) => {
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

routes.get('/approvedblogsbymayor/:id',c.g,c.s, (req, res) => {
  console.log(req.params, 'kksnkk');
  fetchController.getApprovedBlogsByMayor(req.params.id)
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
routes.get('/pending-mayor',c.g,c.s, (req, res) => {
  fetchController.getNotApprovedMayor()
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
routes.get('/pending-mayor/:id', (req, res) => {
  fetchController.getSingleNotApprovedMayor(req.params.id)
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
routes.get('/approvedmayor',c.g,c.s, (req, res) => {
  fetchController.getApprovedMayor()
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

// Route for Top 3 Approved Mayor
routes.get('/topauthor', (req, res) => {
  fetchController.getTopMayor()
    .then(result => res.status(200).json({
      status: "success",
      msg: "Top 3 Approved Mayor Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting Single Approved Author
routes.get('/approvedmayor/:id', (req, res) => {
  fetchController.getSingleApprovedMayor(req.params.id)
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
routes.get('/all-mayor',c.g,c.s, (req, res) => {
  fetchController.getAllMayor()
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

// Route for Getting Single Mayor
routes.get('/all-mayor/:id', (req, res) => {
  fetchController.getSingleAllMayor(req.params.id)
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

// Route for Getting Details of Author Profile
routes.get('/single-mayor/:id', (req, res) => {
  fetchController.getSingleApprovedMayor(req.params.id)
    .then(result => {
      res.status(200).json({
        status: "success",
        msg: "Author Profile",
        result: result
      })
    })
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting Most Liked Blogs
routes.get('/mostlikedblogs',c.g,c.s, (req, res) => {
  fetchController.getMostLikedBlogs()
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

// This is to Verify the Token For the Password Reset Of Author

routes.get('/reset/:token', (req, res) => {
  updateController.verifyUserEmailForPasswordReset(req.params)
    .then(result => {
      res.status(200).redirect('https://onewater.herokuapp.com/onewater/recover-password');
    })
    .catch(err => {
      res.status(400).json({
        status: 'error',
        error: err
      })
    })
})

// This is to Verify the Email
routes.get('/activate/:token', (req, res) => {
  adderController.verifyMail(req.params)
    .then(result => {
      res.status(200).redirect('http://onewater.herokuapp.com/thankyou-author');
    })
    .catch(err => {
      res.status(400).json({
        status: 'error',
        error: err
      })
    })
})


// Route for Getting Videos
routes.get('/video',c.g,c.s, (req, res) => {
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
routes.get('/singlevideo/:email',c.g,c.s, (req, res) => {
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
routes.get('/video/:id',c.g,c.s, (req, res) => {
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
module.exports = routes;
