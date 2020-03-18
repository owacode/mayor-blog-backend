const NotApprovedLeaderBlog= require('../../model/unapproved_blog');
const NotApprovedLeader= require('../../model/unapproved_mayor');
const ApprovedLeader= require('../../model/approved_mayor');
const ApprovedLeaderBlog= require('../../model/approved_blog');
const updateController= require('./update');
const LeaderSavedBlog = require('../../model/savedblog');

class DeleteOperationController{
  // This methord is for deleting the unpproved blog
  // when we approved that blog
  deleteUnApprovedMayorBlog(id){
    console.log('del hit');
    return new Promise((resolve, reject)=> {
    // updateController.deleteApproveBlog(values.mainid);

    NotApprovedLeaderBlog.findByIdAndDelete({_id:id})
    .then(result =>{
      console.log("Blog deleted from UnApproved",result);
      return resolve(result);
    })
    .catch(err =>{
      console.log("Error in Deleting Blog", err);
      return reject(err);
    })
    });
}

  deleteAuthorUnApprovedMayorBlog(values){
    console.log('del hit');
    return new Promise((resolve, reject)=> {
    updateController.deleteApproveBlog(values.mainid);

    NotApprovedLeaderBlog.findByIdAndDelete({_id:values.unapproveid})
    .then(result =>{
      console.log("Blog deleted from UnApproved",result);
      return resolve(result);
    })
    .catch(err =>{
      console.log("Error in Deleting Blog", err);
      return reject(err);
    })
    });
}

  // This methord is for deleting the approved blog by author
  deleteApprovedMayorBlog(values){
    return new Promise((resolve, reject)=> {

    updateController.deleteApproveBlog(values.mainid);

    ApprovedLeaderBlog.findByIdAndDelete({_id:values.approveid})
    .then(result =>{
      console.log("Blog deleted from Approved",result);
      return resolve(result);
    })
    .catch(err =>{
      console.log("Error in Deleting Blog", err);
      return reject(err);
    })
    });
}

// Deleting Saved BLog
  deleteMayorSavedBlog(id){
      console.log('hit delete,&&&&&&&&&&&&&&&&&!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',id)
      LeaderSavedBlog.findByIdAndDelete({_id:id})
      .then(result =>{
        console.log("Saved Blog Deleted", result);
      })
      .catch(err =>{
        console.log("Error in Deleting Saved Blog", err);
      })
}

  // This methord is for deleting the unpproved author
  // when we approved that author profile
  deleteUnApprovedMayor(id){
    return new Promise((resolve, reject)=> {
      console.log('hit delete')
      NotApprovedLeader.findByIdAndDelete({_id:id})
      .then(result =>{
        console.log("Mayor Profile deleted from UnApproved", result);
        resolve(result);
      })
      .catch(err =>{
        console.log("Error in Deleting Mayor Profile", err);
        reject(err);
      })
    })
  }
}

module.exports= new DeleteOperationController();
