const Sequelize = require('sequelize');
const connection = require('../database/database');
const CategoryModel = require('../categories/CategoryModel');


const Article = connection.define('articles', {
    title: {
        type : Sequelize.STRING,
        allowNull : false
    },
    slug : { 
        type : Sequelize.STRING,
        allowNull : false
    },
    body : {
        type : Sequelize.STRING,
        allowNull : false
    }
});


CategoryModel.hasMany(Article);// tem muitos
Article.belongsTo(CategoryModel); // pertence a 


module.exports = Article;