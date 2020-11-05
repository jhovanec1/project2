const express = require('express');
const router = express.Router();
const Users = require('../models').User;
const Useraccount = require('../models').UserAccount;
const transaction = require('../models').Transaction;
const Stock = require('../models').investment;


router.get('/home', (req,res)=>{
    Stock.findAll().then((stock)=>{
        res.render('investhome.ejs', {
            stock:stock
    })
});
});


module.exports = router;