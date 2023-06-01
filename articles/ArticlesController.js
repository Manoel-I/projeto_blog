const express = require('express');
const router = express.Router();
const Article = require('./ArticleModel');
const Category = require('../categories/CategoryModel');
const slugify = require('slugify');

router.get('/admin/articles', (req, res)=>{
   Article.findAll().then(article =>{
      //console.log("articles ===>", article);
      res.render('admin/articles/index', {article : article});
   })
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
   
   if(title != undefined && body != undefined && categoryId != undefined){
      Article.create({
         title : title,
         slug : slugify(title),
         body : body,
         categoryId	: categoryId
      }).then(()=>{
         res.redirect('/admin/articles');
      });
   }else{
      res.redirect("/admin/articles/new");
   }
});

router.post('/articles/delete', (req, res) =>{
   var id = req.body.id;
   if(id != undefined){
      if(!isNaN(id)){
         Article.destroy({
            where: {
               id : id
            }
         }).then( ()=>{
            res.redirect('/admin/articles');
         });
      }else{
         res.redirect('/admin/articles');
      }
   }else{
      res.redirect('/admin/articles');
   }
});

router.get('/admin/articles/edit/:id', (req , res)=>{
   var id = req.params.id;
   if(isNaN(id)){
      res.redirect("/admin/articles");
   }
   Category.findAll().then(category =>{
      Article.findByPk(id).then(article =>{
         if(article !=undefined){
             res.render('admin/articles/edit',{article : article, category : category});
         }else{
            res.redirect('/admin/articles');
         }
      });
   });
   
});



module.exports = router;