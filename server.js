require('dotenv').config()
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');
app.use(methodOverride('_method'));
app.use(express.static('public'));

const cookieParser = require('cookie-parser');

app.use(cookieParser());

const verifyToken = (req, res, next) => {
    let token = req.cookies.jwt; // COOKIE PARSER GIVES YOU A .cookies PROP, WE NAMED OUR TOKEN jwt
  
    console.log("Cookies: ", req.cookies.jwt);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
      if (err || !decodedUser) {
        return res.status(401).json({ error: "Unauthorized Request" });
      }
      req.user = decodedUser; // ADDS A .user PROP TO REQ FOR TOKEN USER
      console.log(decodedUser);
  
      next();
    });
  };

app.use((req,res,next)=>{
    console.log('I run for all the routes');
    next();
});
app.use(express.urlencoded({ extended: true}));
app.use('/user',verifyToken, require('./controllers/usercontroller.js'));
app.use('/invest',require('./controllers/investcontroller.js'));
app.use('/group',require('./controllers/groupcontroller.js'));
app.use('/auth', require('./controllers/authController.js'));

app.get('/', (req,res)=>{
    res.render('main.ejs');
})
var port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('I am listening')
})