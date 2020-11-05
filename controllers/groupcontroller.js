const express = require('express');
const router = express.Router();
const Users = require('../models').User;
const Useraccount = require('../models').UserAccount;
const transaction = require('../models').Transaction;
const Stock = require('../models').investment;
const Group = require('../models').Group;

router.get('/home', (req,res)=>{
    Group.findAll().then((group)=>{
        res.render('grouphome.ejs', {
            group:group
    })
});
});

module.exports = router;