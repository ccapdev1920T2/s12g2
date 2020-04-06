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
    Executes function editProfile() as defined in object controller in `../controllers/controller.js`
    when a client sends an HTTP POST request for `/editprofile` if the user is logged in
*/
app.post('/editProfile', function(req, res, next){
    if(req.session.user == undefined) // if the user is not logged in 
        res.redirect('/'); // redirects user back to the log in page 
    else if(req.session.user.isClient)
        controller.postProfile(req, res, next); // if the user is a client
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


/*
    Executes function checkLogIn() as defined in the object controller in `../controllers/controller.js`
    when a client tries to log in.
*/
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
    Renders `createpost.hbs` as defined in the views folder in `../views/createpost.js`
    when a client sends an HTTP GET request for `/createpost` if the user is logged in as a client
    else it redirects the user back to the log in page
*/
app.get('/createpost', function(req, res) {
    
    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else if(req.session.user.isClient)
        controller.getCreatePost(req, res); // if the user is a client
    else
        res.redirect('/') // if the user is admin
})


/*
    Executes function postCreatePost() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/createpost` if the user is logged in as a client
    else it redirects the user back to the log in page
*/
app.post('/createpost', function(req, res) {
    
    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else if(req.session.user.isClient)
        controller.postCreatePost(req, res); // if the user is a client
    else
        res.redirect('/') // if the user is admin

});


/*
    Executes function postCreatePost() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP POST request for `/sucess` if the user is logged in as a client
    else it redirects the user back to the log in page
*/
app.get('/success', function(req, res) {
    
    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else if(req.session.user.isClient)
        controller.getSuccess(req, res); // if the user is a client
    else
        res.redirect('/') // if the user is admin

});


/*
    Executes function postCreatePost() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP POST request for `/sucess` if the user is logged in as a client
    else it redirects the user back to the log in page
*/
app.post('/success', function(req, res) {
    
    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else if(req.session.user.isClient)
        controller.postCreatePost(req, res); // if the user is a client
    else
        res.redirect('/') // if the user is admin

});


/*
    Executes function getCreatePost() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/createpost` if the user is logged in as a client
    else it redirects the user back to the log in page
*/
app.get('/editpost', function(req, res) {
    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else if(req.session.user.isClient)
        controller.getEditPost(req, res); // if the user is a client
    else
        res.redirect('/') // if the user is admin
})


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
    Executes function getProfile() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP POST request for `/user/:username` if the user is logged in
    else it redirects the user back to the log in page
*/
app.post('/user/:username', function(req, res) {
    
    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else
        controller.postProfile(req, res);

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
    Executes function sendReview() as defined in object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/submitreview` when the user writes a review if the user is logged in
    else it redirects the user back to the log in page
*/
app.post('/user/:username/reviews', function(req, res) {

    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else
        controller.sendReview(req, res);

})


/*
    Renders `registration.hbs` as defined in the object controller in `../views/registration.hbs`
    when a client sends an HTTP GET request for `/register`
*/
app.get('/register', function(req, res) {
    
    res.render('registration');

});


/*
    Executes function getRegistration() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/register`
*/
app.post('/register', function(req, res) {
    
    req.session.destroy(function(err) { // logs out the user, before registration
        controller.getRegistration(req, res);
    })

});


/*
    Executes function checkEmail() as defined in the object controller in `../controllers/controller.js`
    to check if the email being used to register is already taken.
*/
app.post('/checkEmail', function(req, res) {

    controller.checkEmail(req, res);
});


/*
    Executes function checkUsername() as defined in the object controller in `../controllers/controller.js`
    to check if the username being used to register is already taken.
*/
app.post('/checkUsername', function(req, res) {

    controller.checkUsername(req, res);

});


/*
    Executes function getPost() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/posts/:postId` if the user is logged in
    else it redirects the user back to the log in page
*/
app.get('/posts/:postId', function(req, res) {

    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else
        controller.getPost(req, res);

});


/*
    Executes function editPost() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP POST request for `/posts/:postId` if the user is logged in
    else it redirects the user back to the log in page
*/
app.post('/posts/:postId', function(req, res) {

    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else
        controller.editPost(req, res);
});

/*
    Executes function getEditPost() as defined in the object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/posts/:postId/edit` if the user is logged in
    else it redirects the user back to the log in page
*/
app.get('/posts/:postId/edit', function(req, res){

    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else
        controller.getEditPost(req, res);
});

/*
    Executes function getSearch() as defined in object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/search` if the user is logged in
*/
app.get('/search', function(req, res) {
    
    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else
        controller.getSearch(req, res);

});

app.get('/tagged/:tagname', function(req, res){

    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else
        controller.getTagged(req, res);
});


app.get('/posts/:postId/:action', function(req, res){
    if(req.session.user == undefined) // if the user is not logged in
        res.redirect('/'); // redirects user back to the log in page
    else
        controller.getClientAction(req, res);
});


app.get('/users/:id/:action', function(req, res) {
    
        // If no one is logged in or a client is logged in
    if(req.session.user == undefined || req.session.user.isClient)
        res.redirect('/');
    else {
        controller.getAdminUserAction(req, res);
    }

})

/*
    Executes function getReportedUsers() as defined in object controller in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/users` if admin is logged in
*/
app.get('/users', function(req, res) {

    // If no one is logged in or a client is logged in
    if(req.session.user == undefined || req.session.user.isClient)
        res.redirect('/');
    else
        controller.getReportedUsers(req, res);

})


app.get('/user/:username/reportuser', function(req, res) {
    
    // If no one is logged in or admin is logged in
    if(req.session.user == undefined || !req.session.user.isClient)
        res.redirect('/');
    else
        controller.loadReportUser(req, res);

})


app.post('/user/:username/reportuser', function(req, res) {

    // If no one is logged in or admin is logged in
    if(req.session.user == undefined || !req.session.user.isClient)
        res.redirect('/');
    else
        controller.getReportUser(req, res);

})


/* Exports the object `app` (defined above) when another script exports from this file */
module.exports = app;