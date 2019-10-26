const mongoose= require('mongoose');

const author = mongoose.Schema({
  name:{type: String,required:true},
  about_author:{type: String,required:true},
  image:{type: String,required:true},
  date_added:{type: String},
  linkedIn_id:{type: String},
  instagram_id:{type: String},
  twitter_id:{type: String},
  facebook_id:{type: String},
  email:{type: String},
  interest_category:[],
  main_id:{type:String}
})

module.exports = mongoose.model('NotApprovedAuthor', author, 'NotApprovedAuthors')
