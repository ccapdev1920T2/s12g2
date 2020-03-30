// import module `express`
const express = require('express');
const session = require('express-session');

// import module routes from `../controllers/controller.js`
const controller = require('../controllers/controller.js')

const app = express();

app.use(session({
    secret: 'randomstring123',
    resave: false,
    saveUninitialized: true
  }));

// execute function getFavicon() as defined in object controller in `../controllers/controller.js`
// when a client sends an HTTP GET request for `/favicon.ico`
app.get('/favicon.ico', controller.getFavicon);

// when a client sends an HTTP GET request for `/editprofile`
app.get('/editprofile', controller.editProfile);

// execute function getProfile() as defined in object controller in `../controllers/controller.js`
// when a client sends an HTTP GET request for `/:username`
app.get('/user/:username', function(req, res, next) {
    // var user = req.body;
    // console.log(req.body);
    // if(!user){
    //     req.session.backTo = req.originalUrl;
    //     res.redirect('/');
    // }
    // else
    //     controller.getProfile;

    controller.getProfile;

});

// execute function getReviews() as defined in object controller in `../controllers/controller.js`
// when a client sends an HTTP GET request for `/:username/reviews`
app.get('/:username/reviews', controller.getReviews);

// execute function getRegistration() as defined in object controller in `../controllers/controller.js`
// when a client sends an HTTP GET request for `/register`
app.get('/register', controller.getRegistration);

// renders `home.hbs`
// when a client sends an HTTP GET request for `/home`
app.get('/home', function(req, res) {
    console.log(req.body.email);

    res.render('home');
    req.session.email = req.body.email;
    req.session.password = req.body.password;

});

app.post('/', function(req, res) {
        res.render('homepage');
})

// renders `home.hbs`
// when a client sends an HTTP GET request for `/`
app.get('/', function(req, res) {
    res.render('home')}
);

// execute function getPost() as defined in object controller in `../controllers/controller.js`
// when a client sends an HTTP GET request for `/:postId`
app.get('/posts/:postId', controller.getPost);

// exports the object `app` (defined above) when another script exports from this file
module.exports = app;