
//  MongoDB Models
const NotApprovedBlog= require('../../model/unapproved_blog');
const NotApprovedAuthor= require('../../model/unapproved_author');
const ApprovedAuthor= require('../../model/approved_author');
const ApprovedBlog= require('../../model/approved_blog');
const AllBlog= require('../../model/all_blog');
const AllAuthor= require('../../model/all_author');
const HomeBlog= require('../../model/homeblog');
const nodemailer= require('nodemailer');
//Transpoter for sending mails
const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
      user: 'onewateracademy1@gmail.com',
      pass: 'onewater123'
  }
});
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
          name:values.name,
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
        AdminMail(values);
        this.updateAuthorProfileMain(values);
        resolve(result);
      })
      .catch(err =>console.log('error in updating approve',err));
    })
  }

    // Update Profile of Author

  updateAuthorApprovedProfile(values){
    console.log(values,'author iddddddd ###')
    return new Promise((resolve,reject)=> {
                ApprovedAuthor.findByIdAndUpdate({_id:values.id},{
        $set:{
          name:values.name,
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
        console.log('Updated to ApprovedAuthor');
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
          name:values.name,
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
      .then(result => {console.log('Updated to AllAuthor')
          
    })
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

function AdminMail(values){
  console.log(values,'author maillllllllllllllllll$$$')
    let sendingMail = {
      from:' "OneWater " <onewateracademy1@gmail.com> ',
      to: 'Atharva.mungee@onewateracademy.org',
      subject: "New Author Added", // Subject line
      text: "A new Author Profile has been added Please Check AdminPanel.",
      html:`
      <h4>Author Profile<h4>
      <p> A new Author Profile with name <b> ${values.name} </b> and email ${values.email} has been added Please Check AdminPanel. </p>` // html body
    }

    transporter.sendMail(sendingMail,(error,info)=>{
      if(error){
        console.log("Error Hit&&&&")
          console.log('Nodemoalier Error%%%%%%%%%',error);
      }
      else{
        console.log("Success Hit&&&&")
          console.log("Email Sent!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", info.response);
      }
  })
}
module.exports= new UpdateController();
