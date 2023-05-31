const express = require('express');
const router = express.Router();
const Article = require('./ArticleModel');
const Category = require('../categories/CategoryModel');
const slugify = require('slugify');

router.get("/admin/articles/index", (req , res) =>{
   res.render("/admin/articles/index");
});


router.get("/admin/articles/new", (req, res)=>{
   Category.findAll().then(category =>{
      res.render('admin/articles/new',{category : category});
   });
   
});

router.post('/articles/save', (req, res) =>{
   var title = req.body.title;
   var body = req.body.body;
   var categoryId = req.body.category;
   
   if(title != undefined && body != undefined){
      Article.create({
         title : title,
         slug : slugify(title),
         body : body,
         categoryId	: categoryId
      }).then(()=>{
         res.render('/admin/articles/index');
      });
   }else{
      res.redirect("/admin/articles/new");
   }


});






module.exports = router;