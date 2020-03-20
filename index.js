const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

const port = 9090
const app = express();

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials')
}));

app.set('view engine', 'hbs');

const loggedIn = false;
//const adminUser = false;

/* HOME AND REGISTER */

app.get('/', function(req, res){
    res.render('home', {
        title: "bids++"
    });
});

app.post('/', function(req, res){
    res.render('home', {
        title: "bids++"
    });
});

app.get('/registration', function(req, res){
    res.render('registration', {
        title: "register"
    });
});



/* USER VIEW - HOME AND POSTS */

app.post('/home', function(req, res){
    res.render('homepage', {
        useravatar: "img/default.png",
        title: "home",
        post: [
            {
                title: 'off-shoulder cropped top',
                tag: [
                    {tagname: "women's"}, {tagname: "top"} 
                ],
                postername: "sharmainegaw",
                posteravatar: "img/default.png",
                stealprice: 200,
                currentprice: 150,
                itemimg: "img/default.png",
                date: "march 20",
                time: "idk"
            },
            {
                title: 'weee gumagana',
                tag: [
                    {tagname: "misc"}
                ],
                postername: "christinedtc",
                posteravatar: "img/default.png",
                stealprice: 300,
                currentprice: 180,
                itemimg: "img/default.png",
                date: "march 20",
                time: "idk"
            }
        ]
    });
});

app.get('/home', function(req, res){
    res.render('homepage', {
        useravatar: "img/default.png",
        title: "home",
        post: [
            {
                title: 'off-shoulder cropped top',
                tag: [
                    {tagname: "women's"}, {tagname: "top"} 
                ],
                postername: "sharmainegaw",
                posteravatar: "img/default.png",
                stealprice: 200,
                currentprice: 150,
                itemimg: "img/default.png",
                date: "march 20",
                time: "idk"
            },
            {
                title: 'weee gumagana',
                tag: [
                    {tagname: "misc"}
                ],
                postername: "christinedtc",
                posteravatar: "img/default.png",
                stealprice: 300,
                currentprice: 180,
                itemimg: "img/default.png",
                date: "march 20",
                time: "idk"
            }
        ]
    });
});

app.get('/ffs', function(req, res){
    res.render('ffpage', {
        useravatar: "img/default.png",
        title: 'ffs',
        post: [
            {
                title: "weee gumagana",
                tag: [
                    {tagname: "misc"}
                ],
                postername: "christinedtc",
                posteravatar: "img/default.png",
                stealprice: 300,
                currentprice: 180,
                itemimg: "img/default.png",
                date: "march 20",
                time: "idk"
            }
        ]
    });
});



/* (USER) VIEW POST */

//TODO



/* (USER) PROFILE */

app.get('/profile', function(req, res){
    res.render('profile', {
        useravatar: "img/default.png",
        title: "profile",
        profileusername: "nemo",
        dp: "img/default.png",
        checkedstars: [
            {},{},{}
        ],
        bio: "woof woof",
        contactdetails: "911",
        post: [
            {
                title: "weee gumagana",
                tag: [
                    {tagname: "misc"}
                ],
                postername: "christinedtc",
                posteravatar: "img/default.png",
                stealprice: 300,
                currentprice: 180,
                itemimg: "img/default.png",
                date: "march 20",
                time: "idk"
            }
        ]
    });
});



/* (USER) EDIT PROFILE */

//TODO



/* (USER) REVIEWS */

//TODO



/* (USER) CREATE POST */

//TODO



/* (USER) EDIT POST */

//TODO



/* (ADMIN) POSTS*/

//TODO



/* (ADMIN) PROFILE*/

//TODO



/* (ADMIN) REVIEWS*/

//TODO



/* (ADMIN) USER*/

//TODO



/* (ADMIN) VIEW POST*/

//TODO



app.use(express.static('public'));

app.listen(port, function() {
    console.log('Listening at port ' + port); 
});