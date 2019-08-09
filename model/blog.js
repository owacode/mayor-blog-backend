const mongoose= require('mongoose');

const blog = mongoose.Schema({
  title:{type: String,required:true},
  category:{type: String,required:true},
  dateadded:{type: String},
  desc:{type: String,required:true},
  comments:[],
  image:{type: String,required:true}
})

module.exports = mongoose.model('Blog', blog, 'Blog')
