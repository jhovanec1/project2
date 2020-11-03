const express = require('express');
const router = express.Router();
const Users = require('../models').User;
const Useraccount = require('../models').UserAccount;
const transaction = require('../models').Transaction;

// Get login page when clicked from home
router.get('/login',(req,res)=>{
    res.render('login.ejs');
})

// Get signup page when clicked from home
router.get('/signup',(req,res)=>{
    res.render('signup.ejs')
})

// Once signup filled in, create new DB entry and redirect to profile page
router.post('/signup',(req,res)=>{
    Users.create(req.body).then((newUser)=>{
        res.redirect(`/user/profile/${newUser.id}`)
    })
})

// Post Login
router.post('/login', (req,res)=>{
    Users.findOne({
        where: {
            userName: req.body.username,
            password: req.body.password,
        }
    }).then((user)=>{
        res.redirect(`/user/profile/${user.id}`)
        console.log(user)
    })
})

router.get('/profile/:id', (req,res)=>{
    res.render('profile.ejs')
})
// // Get profile page
// router.get('/profile/:id', (req,res)=>{
//     Users.findByPk(req.params.id, {
//         include: [{ model: Useraccount}],
//     }).then((users)=>{
//         UserAccount.findOne().then((account)=>{
//             res.render('profile.ejs', {
//                 account:account,
//                 users:users,
//             })
//         })
//     })
// })


module.exports = router;