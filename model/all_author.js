const mongoose= require('mongoose');

const author = mongoose.Schema({
  approved_id:{type:String},
  name:{type: String,required:true},
  image:{type: String,required:true},
  date_added:{type: String},
  interest_category:[],
  rejected:{type:Boolean, defalut:false},
  status:{type:String, defalut:'pending'}
})

module.exports = mongoose.model('AllAuthor', author, 'AllAuthors');
