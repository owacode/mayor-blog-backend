const mongoose= require('mongoose');

const blog = mongoose.Schema({
  title:{type: String,required:true},
  category:[],
  date_added:{type: Date},
  // author_name:{type:String},
  author_id:{type:String, required:true},
  desc:{type: String,required:true},
  main_id:{type:String},
  image:{type: String,required:true}
})

module.exports = mongoose.model('NotApprovedBlog', blog, 'NotApprovedBlogs')
