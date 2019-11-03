
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
