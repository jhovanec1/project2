const express = require('express');
const router = express.Router();
const Users = require('../models').User;
const Useraccount = require('../models').UserAccount;
const transaction = require('../models').Transaction;
const Stock = require('../models').investment;

// Get Available Investments Page
router.get('/home', (req,res)=>{
    Stock.findAll().then((stock)=>{
        res.render('investhome.ejs', {
            stock:stock
    })
});
});
// Get Individual Listing Page
router.get('/home/:id', (req,res)=>{
    Stock.findByPk(req.params.id).then((stock)=>{
        res.render('investlisting.ejs', {
            stock:stock
        })
    })
})

// Create New Listing
router.post('/add/new', (req,res)=>{
    Stock.create(req.body).then((newinvestment)=>{
        res.redirect('/invest/home');
    })
})

// router.put('/profile/:id', (req,res)=>{
//     Users.update(req.body, {
//         where: {
//             id: req.params.id
//         },
//         returning: true,
//     }).then((users)=>{
//         res.redirect(`/user/profile/${req.params.id}`)
//     })
// })


module.exports = router;