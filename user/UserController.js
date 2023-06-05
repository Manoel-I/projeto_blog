const express = require('express');
const router = express.Router();
const User = require('./UserModel');


router.get('/admin/users', (req , res) =>{
    res.send("list of users");
});


router.get('/admin/users/create', (req, res)=>{
    res.render('/admin/users/create');
});



module.exports = router;