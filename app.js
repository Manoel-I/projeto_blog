const express = require('express'); 
const app = express();
const body_Parser = require('body-parser');
const database = require('./database/database_creation');
const connection = require("./database/database");

app.set('view engine', 'ejs');

//static 
app.use(express.static('public'));

//body parser
app.use(body_Parser.urlencoded({extended
    
    : false}));
app.use(body_Parser.json());

//database
connection
    .authenticate()
    .then(()=>{
        console.log("conexão feita com sucesso");
    }).catch((error) =>{
        console.log("error -->", error);
    });

app.get('/', (req, res) =>{
    res.render('./index');
});


app.listen(8080, ()=>{
    console.log("on server");
});