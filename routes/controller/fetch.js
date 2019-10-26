//  MongoDB Models
const NotApprovedBlog= require('../../model/unapproved_blog');
const NotApprovedAuthor= require('../../model/unapproved_author');
const ApprovedAuthor= require('../../model/approved_author');
const ApprovedBlog= require('../../model/approved_blog');
const AllBlog= require('../../model/all_blog');
const AllAuthor= require('../../model/all_author');

class FetchController{
    // Fetching all Blogs from DB
    getApprovedBlogs(value){
      console.log(value,'aaa')
     return new Promise((resolve, reject)=> {
          const query= ApprovedBlog.find();
          const pagesize= +value.pagesize;
          const currentpage= +value.currentpage;
          let fetchblogs;

          if(pagesize && currentpage){
            query
            .skip(pagesize * (currentpage - 1))
            .limit(pagesize);
          }
          query
          .then(documents=> {
            // console.log(documents,'dsdw');
            fetchblogs= documents;
            return Blog.count();
          })
          .then(totalBlogs=> resolve(fetchblogs, totalBlogs))
          .catch(err => reject(err));
      })
    }

    getAllBlogs(){
      return new Promise((resolve, reject)=> {
        AllBlog.find({})
        .then(result=> {
          // console.log(result);
          resolve(result)})
        .catch(err=> reject(err));
      })
    }

    getNotApprovedBlogs(){
      return new Promise((resolve, reject)=> {
        NotApprovedBlog.find({})
        .then(result=> {
          // console.log(result);
          resolve(result)})
        .catch(err=> reject(err));
      })
    }


    getApprovedBlogs(){
      return new Promise((resolve, reject)=> {
        ApprovedBlog.find({})
        .then(result=> {
          // console.log(result);
          resolve(result)})
        .catch(err=> reject(err));
      })
    }

    getSingleNotApprovedBlog(id){
      return new Promise((resolve,reject)=>{
        NotApprovedBlog.find({_id:id})
        .then(result=> {
          resolve(result);
        })
        .catch(err=>{
          reject(err);
        })
      })
    }
/* <!------------------------------------------------------**********BLOG END***********-------------------------------------------!> */
    getNotApprovedAuthor(){
      return new Promise((resolve, reject)=> {
        NotApprovedAuthor.find({})
        .then(result=> {
          // console.log(result);
          resolve(result)})
        .catch(err=> reject(err));
      })
    }

    getSingleNotApprovedAuthor(id){
      return new Promise((resolve, reject)=> {
        NotApprovedAuthor.find({_id:id})
        .then(result=> {
          resolve(result)})
        .catch(err=> reject(err));
      })
    }

    getSingleApprovedAuthor(id){
      console.log(id,'dwfcwe')
      return new Promise((resolve, reject)=> {
        ApprovedAuthor.find({_id:id})
        .then(result=> {
          resolve(result)})
        .catch(err=> reject(err));
      })
    }

    getApprovedAuthor(){
      return new Promise((resolve, reject)=> {
        ApprovedAuthor.find({})
        .then(result=> {
          // console.log(result);
          resolve(result)})
        .catch(err=> reject(err));
      })
    }

    getAllAuthor(){
      return new Promise((resolve, reject)=> {
        AllAuthor.find({})
        .then(result=> {
          // console.log(result);
          resolve(result)})
        .catch(err=> reject(err));
      })
    }

    getBlogsByaAuthor(id){
      return new Promise((resolve, reject)=> {
        this.getSingleApprovedAuthor({_id:id})
        .then(result=> {
          let blogs_id=result.blogs_added;
          return ApprovedBlog.find({_id:{$in:blogs_id}})
        })
        .then(result=> {
          resolve(result);
        })
        .catch(err=> reject(err));
      })
    }

  }

  module.exports= new FetchController()

