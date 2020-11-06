const express = require('express');
const router = express.Router();
const Users = require('../models').User;
const Useraccount = require('../models').UserAccount;
const transaction = require('../models').Transaction;
const Stock = require('../models').investment;
const Group = require('../models').Group;


router.get('/newsfeed/:id', (req,res)=>{
    res.render('mainpage.ejs', {
        id:req.params.id
        
    })
    
})


// Will need to update routing and delete below

router.get('/profile/:id', (req,res)=>{
    Users.findByPk(req.params.id, {
        include: [{ model: Useraccount}, {model: Group}],
    }).then((user)=>{
        // console.log(user)
        Group.findAll().then((allgroups)=>{
        res.render('profile.ejs',{
            user:user,
            Group:allgroups
        })
        })
    })
})


// Edit the profile
router.put('/profile/:id', (req,res)=>{
    Users.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
    }).then((users)=>{
        res.redirect(`/user/profile/${req.params.id}`)
    })
})
router.put('/profile/:id/funds', (req,res)=>{
    console.log(req.params.id);
    console.log(req.body) 
        Useraccount.create({userid: req.body, balance: req.params.id,}
          )
})


// Delete User
router.delete('/profile/:id', (req,res)=>{
    Users.destroy({
        where: {
            id: req.params.id
          }
        }).then(()=>{
          res.redirect("/")
        })
})


module.exports = router;