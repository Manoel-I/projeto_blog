const express = require('express'); 
const app = express();
const body_Parser = require('body-parser');
const connection = require("./database/database");
//const path = require('path');

//controllers
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

//models
const database = require('./database/database_creation');
const Article = require('./articles/ArticleModel');
const Category = require('./categories/CategoryModel');

app.use(express.static('public'));


app.set('view engine', 'ejs');

//static 
app.use(express.static('public'));
//app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


//body parser
app.use(body_Parser.urlencoded({extended: false}));
app.use(body_Parser.json());

//database
connection
    .authenticate()
    .then(()=>{
        console.log("conexão feita com sucesso");
    })
    .catch((error) =>{
        console.log("error -->", error);
    });

app.use('/', categoriesController, articlesController); // seta os controllers 


app.get('/', (req, res) =>{
    Article.findAll({
        order : [
            ['id', 'DESC']
        ]
    }).then(article =>{
        Category.findAll().then(category =>{
            res.render('index', {article : article, category : category});
        });  
    });
});


app.get("/:slug",(req, res) =>{
    var slug = req.params.slug;

    Article.findOne({
        where :{
            slug : slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(category =>{
                res.render('article', {article : article, category : category});
            });  
        }else{
            res.redirect('/');
        }
    }).catch(error =>{
        console.log("erro ---> ",error);
        res.redirect('/');
    })
});


app.get('/category/:slug', (req, res)=>{
    var slug = req.params.slug;
    Category.findOne({
        where :{
            slug : slug
        },
        include :[{model : Article}]
    }).then(category =>{
        if(category != undefined){
            Category.findAll().then(categories =>{
                res.render('index', {article : category.articles , category : categories});
            });
        }else{
            res.redirect('/');
        }
    }).catch(error =>{
        console.log("error -->",error);
        res.redirect('/');
    })
})

app.listen(8080, ()=>{
    console.log("on server");
});