
//  MongoDB Models
const NotApprovedBlog= require('../../model/unapproved_blog');
const NotApprovedAuthor= require('../../model/unapproved_author');
const ApprovedAuthor= require('../../model/approved_author');
const ApprovedBlog= require('../../model/approved_blog');
const AllBlog= require('../../model/all_blog');
const AllAuthor= require('../../model/all_author');
const HomeBlog= require('../../model/homeblog');

class UpdateController{


  // Update Blog to Home The Home Page Blogs ( 3 Blogs )
  updateHomeBlog(value){
    console.log('hitfefe',value)
    return new Promise((resolve, reject)=>{

      HomeBlog.updateOne({_id:value.id},
        {
          title:value.title,
          category:value.category,
          date_added:getTime(),
          desc:value.desc,
          image:value.imageurl
        })
      .then(response=> {console.log('Updated blog'); resolve(response)})
      .catch(err=> reject(err));
    })
  }

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

  // Approve a Blog

  approveBlog(values){
    console.log(values,'blog iddddddd')
      AllBlog.findByIdAndUpdate({_id:values.mainid},{$set:{approved_id:values.approveid, status:'approved'}})
      .then(result => console.log('Updated to approved'))
      .catch(err =>console.log('error in updating approve',err));
  }

// Delete a Approve Blog
  deleteApproveBlog(values){
    console.log(values,'blog iddddddd')
      AllBlog.findByIdAndUpdate({_id:values.mainid},{$set:{status:'deleted'}})
      .then(result => console.log('Updated to deleted'))
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

  //Add UnApproved id of Blog to Main Blog

  addUnapproveIdToMainBlog(values){
    console.log(values,'author iddddddd')
      AllBlog.findByIdAndUpdate({_id:values.mainid},{$set:{unapproved_id:values.blogid}})
      .then(result => console.log('Updated to approved'))
      .catch(err =>console.log('error in updating approve',err));
  }
  // Update Profile of Author

  updateAuthorProfile(values){
    console.log(values,'author iddddddd')
    return new Promise((resolve,reject)=> {
                NotApprovedAuthor.findByIdAndUpdate({_id:values.id},{
        $set:{
          about_author:values.about_author,
          image:values.imageurl,
          location:values.location,
          interest_category:values.interest_category,
          linkedIn_id:values.linkedIn,
          twitter_id:values.twitter,
          facebook_id:values.facebook,
          instagram_id:values.instagram,
          form_filled:true
        }})
      .then(result => {
        console.log('Updated to NotApprovedAuthor');
        this.updateAuthorProfileMain(values);
        resolve(result);
      })
      .catch(err =>console.log('error in updating approve',err));
    })
  }
  // Update Profile of Author TO Main Collection

  updateAuthorProfileMain(values){
    console.log(values,'author iddddddd')
      AllAuthor.findByIdAndUpdate({_id:values.mainid},{
        $set:{
          about_author:values.about_author,
          image:values.imageurl,
          interest_category:values.interest_category,
          location:values.location,
          linkedIn_id:values.linkedIn,
          twitter_id:values.twitter,
          facebook_id:values.facebook,
          instagram_id:values.instagram,
          form_filled:true
        }})
      .then(result => console.log('Updated to AllAuthor'))
      .catch(err =>console.log('error in updating approve',err));
  }


  //Add Unapprove id to Author

  addunapproveidtoauthor(values){
    console.log(values,'author iddddddd')
      AllAuthor.findByIdAndUpdate({_id:values.mainid},{$set:{unapproved_id:values.unapproved_id}})
      .then(result => console.log('Updated to approved'))
      .catch(err =>console.log('error in updating approve',err));
  }

  // Approve a Author

  approveAuthor(values){
    console.log(values,'author iddddddd')
      AllAuthor.findByIdAndUpdate({_id:values.mainid},{$set:{approved_id:values.approveid, status:'approved'}})
      .then(result => console.log('Updated to approved'))
      .catch(err =>console.log('error in updating approve',err));
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

// This Function is for Getting IST
function getTime(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  var currentTime = new Date();

  var currentOffset = currentTime.getTimezoneOffset();

  var ISTOffset = 330;   // IST offset UTC +5:30

  var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

  // ISTTime now represents the time in IST coordinates
  return ISTTime;
}
module.exports= new UpdateController();
