const express = require('express');
const router = express.Router();
const Users = require('../models').User;


router.get('/login',(req,res)=>{
    res.render('login.ejs');
})

router.get('/signup',(req,res)=>{
    res.render('signup.ejs')
})

module.exports = router;