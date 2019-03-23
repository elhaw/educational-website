var express = require('express');
var router = express.Router();
const aboutRoute = require('./about')
const blogRoute = require('./blog')
const contactRoute = require('./contact')
const usersRoute = require('./users')

/* GET home page. */

module.exports = ()=>{

  router.get('/',(req,res)=>{    
    res.render('index')
  })
  
  router.use('/about',aboutRoute())
  router.use('/blog',blogRoute())
  router.use('/contact',contactRoute())
  router.use('/users',usersRoute())

  return router;
}
