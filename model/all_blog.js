const mongoose= require('mongoose');

const blog = mongoose.Schema({
  approved_id:{type:String},
  unapproved_id:{type:String},
  mayor_id:{type:String},
  mayor_image:{type:String},
  mayor_name:{type:String},
  title:{type: String,required:true},
  read_time:{type:String},
  date_added:{type: Date},
  desc:{type:String},
  image:{type: String,required:true},
  rejected:{type:Boolean, default:false},
  status:{type:String, default:'pending'}
})

module.exports = mongoose.model('AllLeaderBlog', blog, 'AllMayorBlogs');
