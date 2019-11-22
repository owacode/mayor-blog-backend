const mongoose= require('mongoose');

const blog = mongoose.Schema({
  approved_id:{type:String},
  unapproved_id:{type:String},
  author_id:{type:String},
  title:{type: String,required:true},
  category:[],
  read_time:{type:Number},
  date_added:{type: Date},
  desc:{type:String},
  image:{type: String,required:true},
  rejected:{type:Boolean, default:false},
  status:{type:String, default:'pending'}
})

module.exports = mongoose.model('AllBlog', blog, 'AllBlogs');
