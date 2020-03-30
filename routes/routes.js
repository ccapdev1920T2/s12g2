// import module `express`
const express = require('express');

// import module routes from `../controllers/controller.js`
const controller = require('../controllers/controller.js')

const app = express();

// execute function getFavicon() as defined in object controller in `../controllers/controller.js`
// when a client sends an HTTP GET request for `/favicon.ico`
app.get('/favicon.ico', controller.getFavicon);

// when a client sends an HTTP GET request for `/editprofile`
app.get('/editprofile', controller.editProfile);

// execute function getProfile() as defined in object controller in `../controllers/controller.js`
// when a client sends an HTTP GET request for `/:username`
app.get('/user/:username', controller.getProfile);

// execute function getReviews() as defined in object controller in `../controllers/controller.js`
// when a client sends an HTTP GET request for `/:username/reviews`
app.get('/:username/reviews', controller.getReviews);

// execute function getRegistration() as defined in object controller in `../controllers/controller.js`
// when a client sends an HTTP GET request for `/register`
app.get('/register', controller.getRegistration);

// execute function getPost() as defined in object controller in `../controllers/controller.js`
// when a client sends an HTTP GET request for `/:postId`
app.get('/:postId', controller.getPost);

app.get('/', function(req, res) {
    res.render('home')}
);

// exports the object `app` (defined above) when another script exports from this file
module.exports = app;