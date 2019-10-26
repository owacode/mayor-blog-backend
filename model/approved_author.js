const mongoose= require('mongoose');

const author = mongoose.Schema({
  // Basic Info
  name:{type: String,required:true},
  about_author:{type: String,required:true},
  date_added:{type: String},
  date_approved:{type: String},
  interest_category:[],
  image:{type: String,required:true},
  // Followers and Following
  followers:[],
  following:[],
  // Social Accounts
  linkedIn_id:{type: String},
  email:{type: String},
  instagram_id:{type: String},
  twitter_id:{type: String},
  facebook_id:{type: String},
  // BLogs added by user
  // it will contain the id of the blogs
  blogs_added:[],
  // liked_blog:[] Remove it
})

module.exports = mongoose.model('ApprovedAuthor', author, 'ApprovedAuthors')
