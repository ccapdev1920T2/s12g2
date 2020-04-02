// import module `express`
const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session'); 

// import module routes from `../controllers/controller.js`
const controller = require('../controllers/controller.js')

const app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(session({secret: " randomstring123", resave: false, saveUninitialized: true}));


/* 
    Executes function getFavicon() as defined in object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/favicon.ico`
*/
app.get('/favicon.ico', controller.getFavicon);


/*
    Executes function editProfile() as defined in object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/editprofile` if the user is logged in
*/
app.get('/editprofile', function(req, res) {

    if(req.session.user == undefined) // if the user is not logged in 
        res.redirect('/'); // redirects user back to the log in page 
    else if(req.session.user.isClient)
        controller.editProfile(req, res); // if the user is a client
    else
        res.redirect('/'); // if the user is admin

});


/*
    Executes function getHomepage() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/` if the user is logged in
    else it renders 'home.hbs'
*/
app.get('/', function(req, res) {

    if(req.session.user == undefined) // if the user is not logged in
        res.render('home'); // redirects user back to the log in page
    else
        controller.getHomepage(req, res);

});


app.post('/checkLogIn', controller.checkLogIn);

/*
    Executes function getHomepage() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/` if the user is logged in
    else it executes function getLogIn() as defined in the object controller
*/
app.post('/', function(req, res) {

    if(req.session.user == undefined) // if the user is not logged in
        controller.getLogIn(req, res); // redirects user back to the log in page
    else
        controller.getHomepage(req, res);

});


/*
    Executes function getHomepage() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/` if the user is logged in
    else it renders 'home.hbs'
*/
app.get('/home', function(req, res) {

    if(req.session.user == undefined) // if the user is not logged in
        res.render('home');// redirects user back to the log in page
    else
        controller.getHomepage(req, res);
    
});


/*
    Executes function getHomepage() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/` if the user is logged in
    else it executes function getLogIn() as defined in the object controller
*/
app.post('/home', function(req, res) {
    
    if(req.session.user == undefined) // if the user is not logged in
        controller.getLogIn(req, res); // redirects user back to the log in page
    else
        controller.getHomepage(req, res);
    
});


/*
    When the user clicks logout, the session is destroyed
    and the user is redirected back to the log in page
*/
app.get('/logout', function(req, res) {
    
    // destroys the session
    req.session.destroy(function(err) {
        if(err)
            console.log(err);
        else
            res.redirect('/');
    })

});


/*
    Executes function getCreatePost() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/createpost` if the user is logged in as a client
    else it redirects the user back to the log in page
*/
app.get('/createpost', function(req, res) {

    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else if(req.session.user.isClient)
        res.render('createpost'); // if the user is a client
    else
        res.redirect('/') // if the user is admin
})

/*app.post('/createpost', function(req, res) {

    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else if(req.session.user.isClient)
        controller.getCreatePost(req, res); // if the user is a client
    else
        res.redirect('/') // if the user is admin
}) */


/*
    Executes function getCreatePost() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/createpost` if the user is logged in as a client
    else it redirects the user back to the log in page
*/
// app.get('/editpost', function(req, res) {

//     if(req.session.user == undefined) // if the user is not logged in
//         res.redirect('/'); // redirects user back to the log in page
//     else if(req.session.user.isClient)
//         controller.getEditPost(req, res); // if the user is a client
//     else
//         res.redirect('/') // if the user is admin
// }) remove for now


/*
    Executes function getFFs() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/ffs` if the user is logged in
    else it redirects the user back to the log in page
*/
app.get('/ffs', function(req, res) {

    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else if(req.session.user.isClient)
        controller.getFFs(req, res); // if the user is a client
    else
        res.redirect('/'); // if the user is admin

});


/*
    Executes function getProfile() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/user/:username` if the user is logged in
    else it redirects the user back to the log in page
*/
app.get('/user/:username', function(req, res) {
    
    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else
        controller.getProfile(req, res);

});


/*
    Executes function getReviews() as defined in object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/user/:username/reviews` if the user is logged in
    else it redirects the user back to the log in page
*/
app.get('/user/:username/reviews', function(req, res) {

    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else
        controller.getReviews(req, res);

});


/*
    Executes function getRegistration() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/register`
*/
app.get('/register', controller.getRegistration);


/*
    Executes function getPost() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/:postId` if the user is logged in
    else it redirects the user back to the log in page
*/
app.get('/posts/:postId', function(req, res) {

    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else
        controller.getPost(req, res);

});

/*
    Executes function getSearch() as defined in object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/search` if the user is logged in
*/
app.get('/search', function(req, res) {
        controller.getSearch(req, res);
});



/* Exports the object `app` (defined above) when another script exports from this file */
module.exports = app;