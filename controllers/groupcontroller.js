const express = require('express');
const router = express.Router();
const Users = require('../models').User;
const Useraccount = require('../models').UserAccount;
const transaction = require('../models').Transaction;
const Stock = require('../models').investment;
const Group = require('../models').Group;

router.get('/', (req,res)=>{
    Group.findAll().then((groups)=>{
        console.log(groups.length)
        res.render('groupindex.ejs', {
            groups:groups
        })
    })
})


router.get('/:id', (req,res)=>{
    Group.findByPk(req.params.id).then((group)=>{
        // console.log(group);
        res.render('grouphome.ejs', {
            group:group
    })
});
});


module.exports = router;