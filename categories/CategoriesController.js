const express = require('express');
const router = express.Router();
const Category = require('./CategoryModel');
const slugify = require('slugify');

router.get("/admin/categories/new", (req, res)=>{
   res.render('admin/categories/new');
});

router.post('/categories/save', (req, res)=>{
   var title = req.body.title;
   if(title != undefined){
      Category.create({
         title : title,
         slug : slugify(title) 

      }).then(()=>{
        
         res.redirect('/admin/categories/new');
      });
   }else{
      res.redirect("/admin/categories/new");
   }
});

router.get("/admin/categories", (req, res)=>{
   Category.findAll().then(categories =>{
      res.render("admin/categories/index", {categories : categories});
   })
   
});

router.post("/categories/delete", (req , res)=>{
   var id = req.body.id;
   if(id != undefined){
      if(!isNaN(id)){
         Category.destroy({
            where:{
               id : id
            }
         }).then(()=>{
            res.redirect("/admin/categories");
         });

      }else{ // se não for um numero
         res.redirect("/admin/categories");
      }
   }else{// se for undefined
      res.redirect("/admin/categories");
   }
});


router.get("/admin/categories/edit/:id", (req, res)=>{
   var id = req.params.id;
   Category.findByPk(id).then(categoria => {
      if(categoria != undefined ){
         res.render();
      }else{
         res.redirect("/admin/categories");
      }

   }).catch(erro =>{
      res.redirect("/admin/categories");
   });
});


 module.exports = router;