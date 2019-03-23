var express = require('express');
var router = express.Router();
const InsructorModel = require('../../models/instructorModel')
const BlogModel = require('../../models/blogModel')

/* GET about page. */

module.exports = ()=>{

  router.get('/',async (req,res,nex)=>{
    try {
      const instructors = await InsructorModel.find({}).exec()
      const blogs = await BlogModel.find({}).exec()
      res.render('blog',{instructors:instructors,blogs:blogs})
    }
    catch(err) {
      return next(err)
    }

  })
  router.get('/:name',async (req,res,next)=>{
    const blogShortName = req.params.name;
    try {
      const blog = await BlogModel.findOne({shortname:blogShortName}).exec();
      if(!blog) {
        // const isValidblog = false;
        res.locals.isValidblog = false
      }
      else{
        res.locals.isValidblog = true
      }
      const validblog = res.locals.isValidblog
      res.render('singleblog',{validblog:validblog,blog:blog})

    }
    catch(err) {
      return next(err)
    }

  })

  return router;
}
