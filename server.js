const express = require('express');
const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static('public'));


app.use((req,res,next)=>{
    console.log('I run for all the routes');
    next();
});
app.use(express.urlencoded({ extended: true}));
app.use('/user',require('./controllers/usercontroller.js'));
app.use('/invest',require('./controllers/investcontroller.js'));

app.get('/', (req,res)=>{
    res.render('main.ejs');
})
var port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('I am listening')
})