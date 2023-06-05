const express = require('express');
const router = express.Router();
const User = require('./UserModel');
const bcrypt = require('bcryptjs');


router.get('/admin/users', (req , res) =>{
    User.findAll().then(users => {
        res.render('admin/users/users.ejs', {users : users});
    });
    
});


router.get('/admin/users/create', (req, res)=>{
    res.render('admin/users/create');
});

router.post('/users/create', (req, res)=>{
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where : {
            email : email
        }
    }).then(user =>{
        if(user == undefined && email != ""){
            var salt = bcrypt.genSaltSync(10); // a quantidade de "(rounds)" determina o número de iterações que serão realizadas durante o processo de hashing, aumentando assim a resistência a ataques de força bruta
            var hash = bcrypt.hashSync(password, salt);
            User.create({
                    email : email,
                password : hash
            }).then(()=>{
                res.json({email, hash});
            }).catch((error)=>{
                console.log(error);
                res.redirect('/');
            });
        }else{
            res.json({email: email, existe : true});
        }
    })

    
    
});

module.exports = router;