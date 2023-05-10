const Sequelize = require('sequelize');
const connection = require('../database/database');

const Category = connection.define('categories', {
    title: {
        type : Sequelize.STRING,
        allowNull : false
    },
            /* um slug é uma parte legível e amigável de um URL que identifica uma página 
            específica em um site, facilitando a navegação e melhorando a experiência do usuário.*/
    slug : { 
        type : Sequelize.STRING,
        allowNull : false
    }
});


module.exports = Category;