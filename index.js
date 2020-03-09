const express = require('express');
const hbs = require('hbs');
const port = 9090

const app = express();

const loggedIn = false;
const adminloggedin = false;

app.set('view engine', 'hbs');

app.use(express.static('views'));

app.get('/', function(req, res) {
    if(!loggedIn)
        res.sendFile(__dirname + "home.html");
    else
        res.sendFile(__dirname + "homepage.html");
});

app.get('/home', function(req, res) {
    if(!loggedIn)
        res.sendFile(__dirname + "home.html");
    else
        res.sendFile(__dirname + "homepage.html");
});

app.get('/register', function(req, res) {
    res.sendFile(__dirname + "register.html");
});

app.get('/:username', function(req, res) {
    if(!loggedIn)
        res.sendFile(__dirname + "home.html");
    else if (adminloggedin)
        res.sendFile(__dirname + "adminprofile.hbs");
    else
        res.sendFile(__dirname + "profile.hbs");
});

app.get('/:postId', function(req, res) {
    if(!loggedIn)
        res.sendFile(__dirname + "home.html");
    else if (adminloggedin)
        res.sendFile(__dirname + "adminpost.hbs");
    else
        res.sendFile(__dirname + "post.hbs");
});

app.get('/ffs', function(req, res) {
    if(!loggedIn)
        res.sendFile(__dirname + "home.html");
    else
        res.sendFile(__dirname + "ffs.hbs");
});

app.get('/admin', function(req, res) {
    if(!loggedIn)
        res.sendFile(__dirname + "home.html");
    else
        res.sendFile(__dirname + "adminposts.hbs");
});

app.get('/adminusers', function(req, res) {
    if(!loggedIn)
        res.sendFile(__dirname + "home.html");
    else
        res.sendFile(__dirname + "adminusers.hbs");
});
/*
app.get('/', function(req, res) {
    res.sendFile(__dirname + "home.html");
});

app.get('/home', function(req, res) {
    res.sendFile(__dirname + "home.html");
});

hbs.registerHelper('cap', function(text) {
    return text.toUpperCase();
});

hbs.registerHelper('bold', function(text) {
    var x = '<b>' + text + '</b>';

    return x;
});

hbs.registerHelper('isFriend', function(friend) {
    var value;
    if(friend)
        value = 'Unfriend';
    else value = 'Add Friend';

    return value;
})

hbs.registerHelper("link", function(text, url) {
    var x = '<a href=' + url + '>' + text + '</a>';

    return x;
});

hbs.registerPartials(__dirname + '/views/partials');

app.get('/profile', function(req, res) {
    
//    res.render('profile', {
//        title: "Mr.",
//        fn: "Ned",
//        ln: "Stark"
//    });

    res.render("profile", {
        status: false
    });

});

app.get('/friends', function(req, res) {
    res.render("friends", {
        friends: [
            {fn: "Sharmaine", ln: "Gaw"},
            {fn: "Robi", ln: "Banogon"}
        ]
    });
    
});

app.get('/home', function(req, res){
    //res.render("home", {title: "Homepage"});

    // res.render("home", {
    //     label : "Google",
    //     url : "https://www.google.com"
    // });

    res.render('home', {
        fn: 'Ned',
        ln: 'Stark'
    });
});


app.listen(port, function() {
    console.log('Listening at port ' + port); 
}); */