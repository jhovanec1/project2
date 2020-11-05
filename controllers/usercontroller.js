const express = require('express');
const router = express.Router();
const Users = require('../models').User;
const Useraccount = require('../models').UserAccount;
const transaction = require('../models').Transaction;
const Stock = require('../models').investment;
const Group = require('../models').Group;

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

// Post Login and Get Main Newsfeed Page
router.post('/login', (req,res)=>{
    Users.findOne({
        where: {
            userName: req.body.username,
            password: req.body.password,
        }
    }).then((user)=>{
        if(user !== null){
            res.redirect(`/user/newsfeed/${user.id}`);
            console.log(user.id);
        }else{
            console.log('NO')
            return
        }
    })
})
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
        console.log(user)
        res.render('profile.ejs',{
            user:user
        })
    })
})
// Get profile page
// router.get('/profile/:id', (req,res)=>{
//     Users.findByPk(req.params.id, {
//         include: [{ model: Useraccount}],
//     }).then((users)=>{
//         UserAccount.findAll().then((account)=>{
//             res.render('profile.ejs', {
//                 account:account,
//                 users:users,
//             })
//         })
//     })
// })

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