const express = require('express');
const router = express.Router();
const Article = require('./ArticleModel');

router.get("/articles", (req , res) =>{
   res.send("articles route");
});


router.get("/admin/articles/new", (req, res)=>{
   res.render('admin/articles/new');
});

router.post('/articles/save', (req, res) =>{
   var title = req.body.title;
   var body = req.body.text;
   if(title != undefined && body != undefined){
      Category.create({
         title : title,
         slug : slugify(title),
         body : body 

      }).then(()=>{
        
         res.redirect('/admin/articles');
      });
   }else{
      res.redirect("/admin/articles/new");
   }


});






module.exports = router;