const express = require('express');
const router = express.Router();
const Article = require('./ArticleModel');
const Category = require('../categories/CategoryModel');
const slugify = require('slugify');
const sequelize = require('sequelize');
const adminAuth = require('../middleware/adminAuth');

router.get('/admin/articles', adminAuth, (req, res)=>{
   Article.findAll({
      include : [{model : Category}]
   }).then(article =>{
      res.render('admin/articles/index', {article : article});
   })
});

router.get("/admin/articles/new", adminAuth, (req, res)=>{
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

router.get('/admin/articles/edit/:id', adminAuth, (req , res)=>{
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


router.post("/articles/update", adminAuth,(req, res)=>{
   var id = req.body.id;
   var title = req.body.title;
   var body = req.body.body;
   var categoryId = req.body.category;
   Article.update({title : title, slug : slugify(title), body : body, categoryId : categoryId},{
      where : {id : id}
   }).then(()=>{
      res.redirect("/admin/articles");
   }).catch(error =>{
      console.log(error);
      res.redirect('/admin/articles');
   });
});

router.get('/articles/page/:num', (req, res)=>{
   var page = req.params.num;
   var offset = 0;
   if(isNaN(page) || page == 1){
      offset = 0;
   }else{
      offset = parseInt(page -1) * 4;
   }
   
   Article.findAndCountAll({
      limit : 4,
      offset : offset,
      order : [
         ['id', 'DESC']
      ],
   }).then(articles =>{
      var next;
      if(offset + 4 >= articles.count){
         next = false;
      }else{
         next = true;
      }
      var result = {
         page : parseInt(page),
         next : next,
         articles : articles 
      }

      Category.findAll().then(category =>{
         console.log(result.articles);
         res.render('admin/articles/page', {result : result, category : category});
         
      });
     
   });

});



module.exports = router;