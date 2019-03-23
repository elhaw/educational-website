var express = require('express');
var router = express.Router();

/* GET conatct page. */

module.exports = ()=>{

  router.get('/',(req,res)=>{
    res.render('contact')
  })
  
  return router;
}
