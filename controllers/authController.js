const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require("../models").User;

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
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).json(err);
    
        bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
          if (err) return res.status(500).json(err);
          req.body.password = hashedPwd;

    Users.create(req.body)
    .then((newUser)=>{
        const token = jwt.sign(
            {
            username: newUser.username,
                id: newUser.id
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "30 days"
            },
        );
        console.log(token);
        res.cookie("jwt", token);
        res.redirect(`/user/profile/${newUser.id}`);
    })
    .catch((err)=>{
        console.log(err);
        res.send(`err ${err}`);
    });
});
});
});

// Post Login and Get Main Newsfeed Page
router.post('/login', (req,res)=>{
    Users.findOne({
        where: {
            userName: req.body.username,
        },
    }).then((foundUser)=>{
        if (foundUser) {
            bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
              if (match) {
                const token = jwt.sign(
                    {
                    userName: foundUser.userName,
                        id: foundUser.id
                    },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "30 days"
                    },
                );
                console.log(token);
                res.cookie("jwt", token);
                res.redirect(`/user/newsfeed/${foundUser.id}`);
              } else {
                return res.sendStatus(400);
              }
    })
    }
})
})

module.exports = router;