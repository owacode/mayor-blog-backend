
//  MongoDB Models
const NotApprovedBlog= require('../../model/unapproved_blog');
const NotApprovedAuthor= require('../../model/unapproved_author');
const ApprovedAuthor= require('../../model/approved_author');
const ApprovedBlog= require('../../model/approved_blog');
const AllBlog= require('../../model/all_blog');
const AllAuthor= require('../../model/all_author');

class UpdateController{
  // Updating a Blog
  updateBlog(value){
    return new Promise((resolve, reject)=> {

      ApprovedBlog.updateOne({_id:value.id},
        {
          title:value.title,
          category:value.category,
          dateadded:value.date,
          desc:value.desc,
          image:value.imageurl
        })
      .then(response=> {console.log('updated blog'); resolve(response)})
      .catch(err=> reject(err));
    })
  }

  // Approve a Author

  approveAuthor(values){
    console.log(values,'author iddddddd')
      AllAuthor.findByIdAndUpdate({_id:values.mainid},{$set:{approved_id:values.approveid, status:'approved'}})
      .then(result => console.log('Updated to approved'))
      .catch(err =>console.log('error in updating approve',err));
  }

    // Approve a Blog

    approveBlog(values){
      console.log(values,'blog iddddddd')
        AllBlog.findByIdAndUpdate({_id:values.mainid},{$set:{approved_id:values.approveid, status:'approved'}})
        .then(result => console.log('Updated to approved'))
        .catch(err =>console.log('error in updating approve',err));
    }

  // Rejecting a Blog

  rejectBlog(values){
    return new Promise ((resolve, reject) =>{
      AllBlog.findByIdAndUpdate({_id:values.mainid},{$set:{rejected:true, status:'rejected'}})
      .then(result => resolve(result))
      .catch(err =>reject(err));
    })
  }

    // Rejecting a Author Profile

    rejectAuthorProfile(values){
      console.log(values,'mohit hit')
      return new Promise ((resolve, reject) =>{
        AllAuthor.findByIdAndUpdate({_id:values.mainid},{$set:{rejected:true, status:'rejected'}})
        .then(result => resolve(result))
        .catch(err =>reject(err));
      })
    }
}

module.exports= new UpdateController();
