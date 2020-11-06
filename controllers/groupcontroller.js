const express = require('express');
const router = express.Router();
const Users = require('../models').User;
const Useraccount = require('../models').UserAccount;
const transaction = require('../models').Transaction;
const Stock = require('../models').investment;
const Group = require('../models').Group;

// Get group index home page
router.get('/', (req,res)=>{
    Group.findAll().then((groups)=>{
        res.render('groupindex.ejs', {
            groups:groups
        })
    })
})

// Get group based on ID
router.get('/:id', (req,res)=>{
    Group.findByPk(req.params.id).then((group)=>{
        // console.log(group);
        res.render('grouphome.ejs', {
            group:group
    })
});
});

// Get new group page
router.get('/create/new', (req,res)=>{
    res.render('newgroup.ejs')
})
router.post('/create/new', (req,res)=>{
    Group.create(req.body).then((newgroup)=>{
        res.redirect(`/group/${newgroup.id}`)
    })
})


module.exports = router;