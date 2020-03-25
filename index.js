const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

const port = 3000;
const app = express();

const admin = false;
const cannotBeFound = "Cannot find the page you are looking for. :/ or incorrect view (change it sa index.js)";

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials')
}));

app.set('view engine', 'hbs');

handlebars.registerHelper('loop', function(n) {
    var a = [];

    for(var i = 0; i < n; i++)
        a.push(' ');

    return a;
})

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



/* (USER) HOME */

app.post('/home', function(req, res){
    if(!admin)
    {
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
    }

    else
    {
        res.send(cannotBeFound);
    }
});

app.get('/home', function(req, res){
    if(!admin)
    {
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
    }

    else
    {
        res.send(cannotBeFound);
    }
});



/* (ADMIN) HOME */

app.post('/posts', function(req, res){
    if(admin)
    {
        res.render('admin-posts', {
            title: "posts",
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
    }
    else
    {
        res.send(cannotBeFound);
    }
    
});

app.get('/posts', function(req, res){
    if(admin)
    {
        res.render('admin-posts', {
            title: "posts",
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
    }
    else
    {
        res.send(cannotBeFound);
    }
    
});



/* (ADMIN) USERS */

app.get('/users', function(req, res){
    if(admin)
    {
        res.render('admin-users', {
            title: "reported users",
            complaint: [
                {
                    avatar: "img/default.png",
                    reported: "nemo",
                    reason: "idk",
                    complaint: "yadda yadda",
                    date: "march 19",
                    time: "12:00 AM",
                    reporter: "sharmainegaw"
                },
                {
                    avatar: "img/default.png",
                    reported: "nemo",
                    reason: "idk2",
                    complaint: "spammingggg",
                    date: "march 19",
                    time: "12:00 AM",
                    reporter: "julibee"
                }
            ]
        });
    }
    else
    {
        res.send(cannotBeFound);
    }
});



/* (USER) FF PAGE */

app.get('/ffs', function(req, res){
    if(!admin)
    {
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
    }
    else
    {
        res.send(cannotBeFound);
    }
});



/* VIEW POST */

app.get('/view-post', function(req, res){
    if(!admin)
    {
        res.render('viewpost', {
            useravatar: "img/default.png",
            title: "view post",
            posttitle: 'off-shoulder cropped top',
            tag: [
                {tagname: "women's"}, {tagname: "top"} 
            ],
            ffnum: 150,
            postername: "sharmainegaw",
            posteravatar: "img/default.png",
            posterprofile: "profile",
    
            description: "hehehe",
            paymentmode: "cash",
            cutoffdate: "march 30",
            cutofftime: "idk",
            details: "goks",
    
            pic: [
                {img: "img/default.png"},
                {img: "img/default.png"}
            ],
            date: "march 20",
            time: "idk",
    
            bidderavatar: "img/default.png",
            biddername: "nemo",
            stealprice: 200,
            increment: 10,
            currentprice: 150,
        });
    }
    else if(admin)
    {
        res.render('admin-viewpost',{
            title: "admin - view post",
            posttitle: "off-shoulder crop top",
            tag: [
                {tagname: "women's"}, {tagname: "top"} 
            ],
            postername: "sharmainegaw",
            posteravatar: "img/default.png",
            posterprofile: "profile",

            description: "hehehe",
            paymentmode: "cash",
            cutoffdate: "march 30",
            cutofftime: "idk",
            details: "goks",

            pic: [
                {img: "img/default.png"},
                {img: "img/default.png"}
            ],
            date: "march 20",
            time: "idk",
        });
    }
    else
    {
        res.send(cannotBeFound);
    }
});



/* VIEW PROFILE */

app.get('/profile', function(req, res){
    // check first if username is valid

    if(!admin)
    {
        res.render('profile', {
            useravatar: "img/default.png",
            title: "profile",
            profileusername: "nemo",
            checkedstars: "3",
            uncheckedstars: "2",
            dp: "img/default.png",
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
    }
    else if(admin)
    {
        res.render('admin-profile', {
            title: "admin - view profile",
            profileusername: "nemo",
            dp: "img/default.png",
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
    }
    else
    {
        res.send(cannotBeFound);
    }
});



/* (USER) EDIT PROFILE */

app.post('/edit-profile', function(req, res){
    if(!admin)
    {
        res.render('editprofile', {
            useravatar: "img/default.png",
            title: "profile",
            dp: "img/default.png",
            bio: "woof woof",
            contactdetails: 911
        });
    }
    else
    {
        res.send(cannotBeFound);
    }
});

app.get('/edit-profile', function(req, res){
    if(!admin)
    {
        res.render('editprofile', {
            useravatar: "img/default.png",
            title: "profile",
            dp: "img/default.png",
            bio: "woof woof",
            contactdetails: 911
        });
    }
    else
    {
        res.send(cannotBeFound);
    }
});



/* REVIEWS */

app.get('/reviews', function(req, res){
    if(!admin)
    {
        res.render('profilereviews', {
            useravatar: "img/default.png",
            title: "username - reviews",
            profileusername: "nemo",
            checkedstars: 4,
            uncheckedstars: 1,
            dp: "img/default.png",
            bio: "woof woof",
            contactdetails: 911,
            review: [
                {
                    checkedstars: 4,
                    uncheckedstars: 1,
                    username: "nemo",
                    avatar: "img/default.png",
                    text: "woof",
                },
                {
                    checkedstars: 3,
                    uncheckedstars: 2,
                    username: "nemo",
                    avatar: "img/default.png",
                    text: "WOOOOOOOOF"
                }
            ]
        });
    }
    else if(admin)
    {
        res.render('admin-profilereviews', {
            title: "admin - username reviews",
            profileusername: "nemo",
            dp: "img/default.png",
            bio: "woof woof",
            contactdetails: 911,
            review: [
                {
                    username: "nemo",
                    avatar: "img/default.png",
                    text: "woof",
                },
                {
                    username: "nemo",
                    avatar: "img/default.png",
                    text: "WOOOOOOOOF"
                }
            ]
        });
    }
    else
    {
        res.send(cannotBeFound);
    }
});



/* (USER) CREATE POST */

app.post('/create-post', function(req, res){
    if(!admin)
    {
        res.render('createpost', {
            useravatar: "img/default.png",
            title: "username - create post"
        });
    }
    else
    {
        res.send(cannotBeFound);
    }
});

app.get('/create-post', function(req, res){
    if(!admin)
    {
        res.render('createpost', {
            useravatar: "img/default.png",
            title: "username - create post"
        });
    }
    else
    {
        res.send(cannotBeFound);
    }
});



/* (USER) EDIT POST */

app.post('/edit-post', function(req, res){
    if(!admin)
    {
        res.render('createpost', {
            useravatar: "img/default.png",
            title: "username - create post"
        });
    }
    else
    {
        res.send(cannotBeFound);
    }
});

app.get('/edit-post', function(req, res){
    if(!admin)
    {
        res.render('createpost', {
            useravatar: "img/default.png",
            title: "username - create post"
        });
    }
    else
    {
        res.send(cannotBeFound);
    }
});



app.use(express.static('public'));

app.listen(port, function() {
    console.log('Listening at port ' + port); 
});