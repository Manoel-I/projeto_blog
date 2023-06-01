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
    res.render('./index');
});


app.listen(8080, ()=>{
    console.log("on server");
});