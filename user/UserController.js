const express = require('express');
const router = express.Router();
const User = require('./UserModel');
const bcrypt = require('bcryptjs');
const adminAuth = require('../middleware/adminAuth');


router.get('/admin/users', adminAuth, (req , res) =>{
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

router.post("/user/delete", (req , res)=>{
    var id = req.body.id;
    if(id != undefined){
       if(!isNaN(id)){
          User.destroy({
             where:{
                id : id
             }
          }).then(()=>{
             res.redirect("/admin/users");
          });
       }else{
          res.redirect("/admin/users");
       }
    }else{
       res.redirect("/admin/users");
    }
});

router.get('/users/login', (req, res) =>{
    res.render('admin/users/login');
});

router.post('/authenticate', (req , res)=>{
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where :{
            email : email
        }
    }).then(user =>{
        if(user != undefined){
            var correct = bcrypt.compareSync(password, user.password);
            if(correct){
                req.session.user = {
                    id : user.id,
                    email : user.email
                }
                res.redirect('/admin/users');
            }else{
                res.redirect('/users/login');
            }
        }else{
            res.redirect('/users/login');
        }
    });
});

router.get('/logout', (req , res) =>{
    req.session.user = undefined;
    res.redirect('/');
})

module.exports = router;