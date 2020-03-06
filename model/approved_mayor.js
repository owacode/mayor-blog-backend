const mongoose= require('mongoose');

const author = mongoose.Schema({
  // Basic Info
  name:{type: String},
  bio:{type: String},
  location:{type: String},
  date_added:{type: Date},
  date_approved:{type: Date},
  image:{type: String},
  email:{type: String, unique:true},
  password:{type: String},
  salt:{type: String},
  token:{type: String},
  interest_category:[],
  main_id:{type:String},
  verified:{type:Boolean},
  form_filled:{type:Boolean},
  // Social Accounts
  linkedIn_id:{type: String},
  email:{type: String},
  twitter_id:{type: String},
  // BLogs added by user
  // it will contain the id of the blogs
  approved_blogs_added:[],
  unapproved_blogs_added:[],
  all_blogs_added:[],
  // liked_blog:[] Remove it
})

module.exports = mongoose.model('ApprovedMayor', author, 'ApprovedMayors')
