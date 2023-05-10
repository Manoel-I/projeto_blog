const express = requeire('express');
const router = express.Router();


 router.get("/categories", (req , res) =>{
    res.send("categories route");
 });


 router.get("/admin/categories/new", (req, res)=>{
    res.send("route admin");
 });

 module.exports = router;