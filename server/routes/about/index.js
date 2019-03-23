var express = require('express');
var router = express.Router();

/* GET about page. */

module.exports = ()=>{

  router.get('/',(req,res)=>{
    res.render('about')
  })
  
  return router;
}
