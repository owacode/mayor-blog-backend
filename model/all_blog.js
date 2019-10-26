const mongoose= require('mongoose');

const blog = mongoose.Schema({
  approved_id:{type:String},
  title:{type: String,required:true},
  category:[],
  date_added:{type: String},
  author_name:{type:String, required:true},
  image:{type: String,required:true},
  rejected:{type:Boolean, defalut:false},
  status:{type:String, defalut:'pending'}
})

module.exports = mongoose.model('AllBlog', blog, 'AllBlogs');
