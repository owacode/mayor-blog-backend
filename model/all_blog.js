const mongoose= require('mongoose');

const blog = mongoose.Schema({
  approved_id:{type:String},
  title:{type: String,required:true},
  category:[],
  date_added:{type: Date},
  // author_name:{type:String},
  image:{type: String,required:true},
  rejected:{type:Boolean, default:false},
  status:{type:String, default:'pending'}
})

module.exports = mongoose.model('AllBlog', blog, 'AllBlogs');
