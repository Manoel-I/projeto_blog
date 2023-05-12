const express = require('express');
const router = express.Router();


 router.get("/admin/categories/new", (req, res)=>{
    res.render('admin/categories/new');
 });

router.post('/categories/save', (req, res)=>{
   var title = req.body.title;
   if(title != undefined){
      
   }
});

 module.exports = router;