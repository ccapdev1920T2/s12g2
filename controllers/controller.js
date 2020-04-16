const multer = require('multer');

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/bids", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
var mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'MongoDB connection error'));

const Category  = require('../models/category.js');
const Client    = require('../models/client.js');
// const File      = require('../models/file.js');
const Post      = require('../models/post.js');
const Report    = require('../models/report.js');
const Review    = require('../models/review.js');
const User      = require('../models/user.js');


// function that converts an array of documents to objects
// got code from https://dev.to/abourass/how-to-solve-the-own-property-issue-in-handlebars-with-mongoose-2l7c

const multipleMongooseToObj = (arrayOfMongooseDocuments) => {
    const tempArray = [];
    if (arrayOfMongooseDocuments.length !== 0){
      arrayOfMongooseDocuments.forEach(doc => tempArray.push(doc.toObject()));
    }
    return tempArray;
};

var Storage = multer.diskStorage
({
    destination: function(req, file, callback) {
        callback(null, './public/img');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});



const controller = {
    
    getFavicon: function (req, res) {
        console.log("@ getFavicon");
        
        res.status(204);
    },
  
    /* LOADS A USER'S PROFILE */
    getProfile: function(req, res) {
        console.log("@ getProfile");

        Client.findOne({username: req.params.username}, function(err, viewedclient){

            // if profile exists
            if (viewedclient)
            {
                viewedclient = viewedclient.toObject();

                viewedclient.hasfb = (viewedclient.facebook);
                viewedclient.hasig = (viewedclient.instagram);
                viewedclient.hastw = (viewedclient.twitter);

                viewedclient.avatar = (viewedclient.avatar == null) ? "/img/default.png" : viewedclient.avatar;

                // if the user is a client
                if(req.session.user.isClient)
                {
                    // if user is suspended
                    if (viewedclient.isSuspended)
                    {
                        res.render("suspended", {
                            isSelf: false,
                            isOther: true,
                            isPost: false,
                            username: viewedclient.username
                        })
                    }
                    
                    // if user is viewing their own profile
                    else if (JSON.stringify(req.session.user._id) == JSON.stringify(viewedclient.user)){

                        Post.find({poster: viewedclient._id}).populate('poster').populate('category').sort({postdate : -1}).exec(function(err, results){
                            var posts = [];

                            if(results)
                                posts = multipleMongooseToObj(results);

                            posts.forEach(function (post) {
                                post.postername = post.poster.username;
                                
                                if(post.poster.avatar != null)
                                    post.posteravatar = post.poster.avatar;
                                else
                                    post.posteravatar = "/img/default.png";

                                post.tagname = post.category.name;
            
                                var timestamp = new Date(post.postdate)
            
                                post.date = timestamp.toDateString();
                                post.time = timestamp.toTimeString().substring(0, 5);
                                post.itemimg = post.picture[0];
                            })

                            res.render('self-profile', {
                                titletag: viewedclient.username,
                                title: viewedclient.username,
                                username: viewedclient.username,
                                profiledetails: viewedclient,
                                post: posts
                            });

                        }); 

                    }
                    else {
                        // find current session user

                        Client.findOne({user: req.session.user}, function(err, currentclient){

                            Post.find({poster: viewedclient}).populate('poster').populate('category').sort({postdate : -1}).exec(function(err, results){
                                
                                var posts = [];
                                
                                if(results)
                                    posts = multipleMongooseToObj(results);

                                posts.forEach(function (post) {
                                    post.postername = post.poster.username;
                                    
                                    post.posteravatar = (post.poster.avatar == null) ? "/img/default.png" : post.poster.avatar;

                                    post.tagname = post.category.name;
                
                                    var timestamp = new Date(post.postdate)
                
                                    post.date = timestamp.toDateString();
                                    post.time = timestamp.toTimeString().substring(0, 5);

                                    post.itemimg = post.picture[0];
                                })
    
                                res.render('profile', {
                                    titletag: viewedclient.username,
                                    title: viewedclient.username,
                                    username: currentclient.username,
                                    profiledetails: viewedclient,
                                    post: posts
                                });
                            });
                        });
                    }   
                }
                else // if the user is admin
                {
                    Post.find({poster: viewedclient}).populate('poster').populate('category').sort({postdate : -1}).exec(function(err, results){
                                
                        var posts = [];
                        
                        if(results)
                            posts = multipleMongooseToObj(results);

                        posts.forEach(function (post) {
                            post.postername = post.poster.username;
                            
                            post.posteravatar = (post.poster.avatar == null) ? "/img/default.png" : post.poster.avatar;

                            post.tagname = post.category.name;
        
                            var timestamp = new Date(post.postdate)
        
                            post.date = timestamp.toDateString();
                            post.time = timestamp.toTimeString().substring(0, 5);

                            post.itemimg = post.picture[0];
                        })

                        res.render('admin-profile', {
                            titletag: viewedclient.username,
                            title: viewedclient.username,
                            profiledetails: viewedclient,
                            post: posts
                        });
                    });
                }
            }
            else  // if profile does not exist
            {
                res.render('error');
            }
        });
    },

    /* UPDATES PROFILE */
    postProfile: function(req, res, next) {
        console.log("@ postProfile");

        var upload = multer({
            storage: Storage
        }).single("avatar");

        upload(req, res, function(err){

            if(err) {
                console.log(err);
                return res.render("error");
            }
            
            var temp;
            if(req.file)
                temp = req.file.path;

            //TODO add popup error in hbs file if passwords do not match
            if (req.body.pw && req.body.pw == req.body.cpw)
            {
                User.findOne({_id: req.session.user._id}, function(err, user){
                    user.password = req.body.pw;

                    user.save(function(err){
                        if (err) res.render("error");
                        console.log("Updated user: " + user);
                    });
                })
            }

            Client.findOne({user: req.session.user}, function(err, client){
            
                if(temp)
                    client.avatar = temp.substr(6);
    
                if(req.body.tw)
                {
                    client.twitter = req.body.tw;
                    client.hasig = true;
                }
                    
                if(req.body.fb)
                {
                    client.facebook = req.body.fb;
                    client.hasig = true;
                }
    
                if(req.body.ig)
                {
                    client.instagram = req.body.ig;
                    client.hasig = true;
                }
    
                if(req.body.bio)
                    client.bio = req.body.bio;
    
                if(req.body.contactd)
                    client.number = req.body.contactd;
    
                client.save(function(err){
                    if (err) res.render("error");
                    console.log("Updated client: " + client);
                    res.redirect('/user/' + client.username);
                });
            })

        });
    },

    /* LOADS EDIT PROFILE */
    editProfile: function(req, res) { 
        console.log("@ editProfile");
        
        query = {user: req.session.user}

        Client.findOne(query, function(err, result){

            result = result.toObject();

            res.render('editprofile', {
                titletag: "Edit Profile",
                username: result.username,
                profiledetails: result
            });
        });
    },

    /* LOADS HOMEPAGE */
    getHomepage: function(req, res) {
        console.log("@ getHomepage");
        
        if (req.session.user.isClient)
        {
            var sortOpt = this.sortOptions(req);
            var filter = {};

            if (req.query.filter)
                filter = {name: req.query.filter};
            
            Category.find(filter).exec(function(err, result){

                Post.find({category: result}).populate('poster').populate('category').sort(sortOpt).exec(function(err, results){
                    if (err) throw err;

                    var temp = []
                    var posts = []

                    if (results)
                        temp = multipleMongooseToObj(results);

                    temp.forEach(function (post) {
                        if(!post.poster.isSuspended)
                        {
                            post.postername = post.poster.username;
                            
                            post.posteravatar = (post.poster.avatar == null) ? "/img/default.png" : post.poster.avatar;

                            post.tagname = post.category.name;
        
                            var timestamp = new Date(post.postdate)
        
                            post.date = timestamp.toDateString();
                            post.time = timestamp.toTimeString().substring(0, 5);

                            post.itemimg = post.picture[0];

                            posts.push(post);
                        }
                    })

                    Client.findOne({user: req.session.user}, function(err, result){

                        if(result.isSuspended)
                        {
                            req.session.destroy(function(err) {
                                if(err)
                                    console.log(err);
                                else
                                    res.render("suspended", {        
                                        isSelf: true,
                                        isOther: false,
                                        isPost: false,
                                    });
                            });
                        }
                        else
                        {
                            res.render('homepage', {
                                titletag: "Dashboard",
                                username: result.username,
                                post: posts
                            });
                        }
                    });
                });
            });
        }
        else {

            Post.find({isOpen: true, isApproved: false, isReviewed: false}).populate('poster').populate('category').sort({postdate : -1}).exec(function(err, results){
                if(err) throw err;
                var temp = []
                var posts = []
                if (results)
                    temp = multipleMongooseToObj(results);

                temp.forEach(function (post) {
                    if(!post.poster.isSuspended)
                    {
                        post.postername = post.poster.username;
                        
                        post.posteravatar = (post.poster.avatar == null) ? "/img/default.png" : post.poster.avatar;

                        post.tagname = post.category.name;

                        var timestamp = new Date(post.postdate)

                        post.date = timestamp.toDateString();
                        post.time = timestamp.toTimeString().substring(0, 5);

                        post.itemimg = post.picture;

                        posts.push(post);
                    }
                })

                res.render('admin-posts', {
                    titletag: "Dashboard",
                    post: posts
                });
            });
        }
    },

    /*  
        CHECKS IF THE USER LOGGING IN IS VALID. IF THE EMAIL AND PASSWORD MATCHES
        A DOCUMENT IN THE DATABASE, 'homepage' IS RENDERED, ELSE, USER IS REDIRECTED
        BACK TO THE LOGIN PAGE 
    */
    getLogIn : function(req, res) {
        console.log("@ getLogIn");
        
        User.findOne({email: req.body.email, password: req.body.password}, function(err, result){

            if (err) throw err;

            if (!result)
            {
                res.status(404).send();
                res.redirect('/#getstarted');
            }
            
            else
            {
                req.session.user = result;

                if (req.session.user.isClient)
                {

                    Post.find({}).populate('poster').populate('category').sort({postdate : -1}).exec(function(err, results){
                        if (err) throw err;

                        var temp = []
                        var posts = []

                        if (results)
                            temp = multipleMongooseToObj(results);

                        temp.forEach(function (post) {
                            if(!post.poster.isSuspended)
                            {
                                post.postername = post.poster.username;
                                
                                post.posteravatar = (post.poster.avatar == null) ? "/img/default.png" : post.poster.avatar;

                                post.tagname = post.category.name;
            
                                var timestamp = new Date(post.postdate)
            
                                post.date = timestamp.toDateString();
                                post.time = timestamp.toTimeString().substring(0, 5);

                                post.itemimg = post.picture[0];

                                posts.push(post);
                            }
                        })

                        Client.findOne({user: req.session.user}, function(err, result){

                            if(result.isSuspended)
                            {
                                req.session.destroy(function(err) {
                                    if(err)
                                        console.log(err);
                                    else
                                        res.render("suspended", {        
                                            isSelf: true,
                                            isOther: false,
                                            isPost: false,
                                        });
                                });
                            }
                            else
                            {
                                res.render('homepage', {
                                    titletag: "Dashboard",
                                    username: result.username,
                                    post: posts
                                });
                            }
                            
                        });
                    })
                }
                else {

                    Post.find({isApproved: false, isReviewed: false}).populate('poster').populate('category').sort({postdate : -1}).exec(function(err, results){
                        if(err) throw err;

                        var posts = []
                        var temp = []
                        if (results)
                            temp = multipleMongooseToObj(results);
        
                        temp.forEach(function (post) {
                            if(!post.poster.isSuspended)
                            {
                                post.postername = post.poster.username;
                                
                                post.posteravatar = (post.poster.avatar == null) ? "/img/default.png" : post.poster.avatar;

                                post.tagname = post.category.name;
            
                                var timestamp = new Date(post.postdate)
            
                                post.date = timestamp.toDateString();
                                post.time = timestamp.toTimeString().substring(0, 5);

                                post.itemimg = post.picture[0];
                                
                                posts.push(post);
                            }
                        });
        
                        res.render('admin-posts', {
                            titletag: "Dashboard",
                            post: posts
                        });
                    });
                }
            }
        });
    },

    /* LOADS REGISTRATION */
    postRegistration: function(req, res) {
        console.log("@ postRegistration");
        
        var idnum = req.body.idnum;
        var email = req.body.email;
        var username = req.body.username;
        var phone = req.body.phone;
        var pw = req.body.password;
        var cpw = req.body.confirmpassword;

        if(idnum && idnum.length == 8 && email && username && phone &&
           phone.length == 11 && pw && cpw && pw == cpw) {

            var user = new User({
                email: email,
                password: pw,
                isClient: true
            });

            user.save(function(err){
                if (err) res.render("error");
                console.log('New User: ' + user);
    
                var client = new Client({
                    user: user,
                    id_num: idnum,
                    username: username,

                    number: phone,
                    bio: null,
                    twitter: null,
                    facebook: null,
                    instagram: null,
                    hasfb: null,
                    hasig: null,
                    hastw: null,
                    isSuspended: false,
                    likedposts: null,
                });

                client.save(function(err){
                    if (err) res.render("error");
                    console.log('New Client: ' + client);
                    res.render('welcome');
                });
            });
        }
    },

    /* CHECKS IF THE EMAIL IS ALREADY TAKEN. */
    checkEmail: function(req, res) {
        console.log("@ checkEmail");

        var email = req.query.email;

        User.findOne({email: email}).exec(function(err, result){
            
            res.send(result);
        });
    },

    /* CHECKS IF THE USERNAME IS ALREADY TAKEN. */
    checkUsername: function(req, res) {
        console.log("@ checkUsername");

        
        var username = req.query.username;

        Client.findOne({username: username}).exec(function(err, result){
            res.send(result);
        });
    },

    /* LOADS A POST */
    getPost: function(req, res) {
        console.log("@ getPost");

        Post.findOne({_id: req.params.postId}).populate('poster').populate('category').populate('highestbidder').exec(function(err, result){

            if(!result)
                res.render("error");

            var post = result.toObject();

            if(result.poster.isSuspended)
            {
                res.render("suspended", {
                    isSelf: false,
                    isOther: false,
                    isPost: true
                });
            }
            else
            {
                post.postername = result.poster.username;
                if(result.highestbidder){
                    post.biddername = result.highestbidder.username;
                    post.bidderavatar = post.highestbidder.avatar;
                }
                else 
                {
                    post.biddername = "-";
                    post.bidderavatar = '/img/default.png';
                }
    
                var cutoff = new Date(post.cutoff);
                var postdate = new Date(post.postdate);
                var datenow = new Date(Date.now());
                post.posteravatar = (post.poster.avatar == null) ? "/img/default.png" : post.poster.avatar;
    
                post.tagname = post.category.name;
                post.cutoffdate = cutoff.toDateString();
                post.cutofftime = cutoff.toTimeString().substring(0, 5);
                post.date = postdate.toDateString();
                post.time = postdate.toTimeString().substring(0, 5);
                
                post.image = [];
                post.picture.forEach(function(picture, index){
                    post.image[index] = new Object();
                    post.image[index].itemimg = picture;
                });
    
                post.itemimg = post.picture;

                post.isOpen = (post.currentprice == post.stealprice || cutoff.getTime() < datenow.getTime()) ? false : true;

                result.save(function(err) {
                    if (err) res.render("error");
                })
        
    
                // find current session client
                Client.findOne({user: req.session.user}, function(err, result){
    
                    // check if post is client's own post
                    post.isNotPoster = (JSON.stringify(post.poster) != JSON.stringify(result)) ? true : false;
    
                    if(req.session.user.isClient) {
                        res.render('viewpost', {
                            titletag: post.title,
                            username: result.username,
                            post: post
                        });
                    }
    
                    else{
                        res.render('admin-viewpost', post);
                    }
                });
            }
        });
    },

    /* LOADS REVIEWS */
    getReviews: function(req, res) {
        console.log("@ getReviews");

        Client.findOne({username: req.params.username}, function(err, viewedclient){

            // if profile exists
            if (viewedclient)
            {
                if(viewedclient.isSuspended)
                {
                    res.render("suspended", {
                        isSelf: false,
                        isOther: true,
                        isPost: false,
                        username: viewedclient.username,
                    });
                }
                else
                {
                    viewedclient = viewedclient.toObject();

                    viewedclient.hasfb = (viewedclient.facebook);
                    viewedclient.hasig = (viewedclient.instagram);
                    viewedclient.hastw = (viewedclient.twitter);

                    //client view
                    if(req.session.user.isClient)
                    {
                        // if user is viewing their own profile
                        if(JSON.stringify(req.session.user._id) == JSON.stringify(viewedclient.user)){

                            Review.find({revieweduser: viewedclient._id}).populate('reviewer').sort({datesubmitted: -1}).exec(function(err, results){
                                var reviews = [];

                                if(results)
                                    reviews = multipleMongooseToObj(results);
                                
                                reviews.forEach(function (review)
                                {
                                    review.checkedstars = parseInt(review.num_stars);
                                    review.uncheckedstars = 5 - parseInt(review.num_stars);
                                    review.username = review.reviewer.username;
                                    review.avatar = review.reviewer.avatar;
                                    review.text = review.review;

                                    var timestamp = new Date(review.datesubmitted)
    
                                    review.date = timestamp.toDateString();
                                    review.time = timestamp.toTimeString().substring(0, 5);
                                })

                                res.render('self-profilereviews', {
                                    titletag: "My Reviews",
                                    title: viewedclient.username,
                                    username: viewedclient.username,
                                    profiledetails: viewedclient,
                                    review: reviews
                                });
                            });                      
                        }
                        else {
                            // find current session user

                            Client.findOne({user: req.session.user}, function(err, currentclient){

                                Review.find({revieweduser: viewedclient._id}).populate('reviewer').sort({datesubmitted: -1}).exec(function(err, results){
                                    
                                    var reviews = [];
                                    
                                    if(results)
                                        reviews = multipleMongooseToObj(results);

                                    reviews.forEach(function (review) {
                                        
                                        review.checkedstars = parseInt(review.num_stars);
                                        review.uncheckedstars = 5 - parseInt(review.num_stars);
                                        review.username = review.reviewer.username;
                                        review.avatar = review.reviewer.avatar;
                                        review.text = review.review;

                                        var timestamp = new Date(review.datesubmitted)
        
                                        review.date = timestamp.toDateString();
                                        review.time = timestamp.toTimeString().substring(0, 5);

                                    })
                                   
                                    res.render('profilereviews', {
                                        titletag: viewedclient.username + "'s Reviews",
                                        title: viewedclient.username,
                                        username: currentclient.username,
                                        profiledetails: viewedclient,
                                        review: reviews
                                    });
                                });
                            });
                        }   
                    }

                    //admin view
                    else
                    {
                        Review.find({revieweduser: viewedclient._id}).populate('reviewer').sort({datesubmitted: -1}).exec(function(err, results){
                                
                            var reviews = [];
                            
                            if(results)
                                reviews = multipleMongooseToObj(results);

                            reviews.forEach(function (review) {
                                
                                review.checkedstars = parseInt(review.num_stars);
                                review.uncheckedstars = 5 - parseInt(review.num_stars);
                                review.username = review.reviewer.username;
                                review.avatar = review.reviewer.avatar;
                                review.text = review.review;

                                var timestamp = new Date(review.datesubmitted)

                                review.date = timestamp.toDateString();
                                review.time = timestamp.toTimeString().substring(0, 5);
                            })

                            res.render('admin-profilereviews', {
                                titletag: viewedclient.username + "'s Reviews",
                                title: viewedclient.username,
                                profiledetails: viewedclient,
                                review: reviews
                            });
                        });
                        
                    }
                }
            }
            else // if profile does not exist
            {
                res.render('error');
            }
        });

    },

    /* ADDS THE REVIEW TO THE DATABASE */
    sendReview: function(req, res) {
        console.log("@sendReview");

        var stars = req.body.stars;
        var reviewtext = req.body.reviewbox;

        if(reviewtext && stars != "none")
        {
            Client.findOne({user: req.session.user}, function(err, poster){

                Client.findOne({username: req.params.username}, function(err, reviewed) {
                    if(!reviewed)
                        res.render("error");

                    var review = new Review({
                        num_stars: stars,
                        reviewer: poster,
                        revieweduser: reviewed,
                        review: reviewtext
                    })

                    review.save(function(err) {
                        if (err) res.render("error");
                        console.log("New Review: " + review);

                        res.redirect(req.get('referer'));

                    })
                })
            });
        }
    },

    /* VALIDATES INFORMATION ENTERED AT LOG IN PAGE*/
    checkLogIn: function(req, res) {
        console.log("@ checkLogIn");
        
        var email = req.body.email;
        var password = req.body.password;

        var query = {email: email, password: password};

        User.findOne(query, function(err, result){
            res.send(result);
        })
    },

    /* LOADS CREATE POST */
    getCreatePost: function(req, res) {
        console.log("@ getCreatePost");
        
        var query = {user: req.session.user};

        Client.findOne(query, function(err, result){
            result = result.toObject();

            res.render('createpost', {
                titletag: "Create Post",
                username: result.username
            });
        })
    },


    /* ADDS NEW POST INTO DATABASE */
    postCreatePost: function(req, res) {
        console.log("@ postCreatePost");

        var upload = multer({
            storage: Storage
        }).array("pic", 10);

        upload(req, res, function(err){
            if(err) {
                console.log(err);
                return res.render("error");
            }
            var ogpaths = req.files.map(file => file.path);
            var paths = []
            ogpaths.forEach(function(path){
                paths.push(path.substr(6));
            });
            
            var itemname = req.body.itemname.toUpperCase();
            var description = req.body.description;
            var sprice = req.body.sprice;
            var priceinc = req.body.priceinc;
            var stealp = req.body.stealp;
            var cutoffdt = req.body.cutoffdt;
            var modep = req.body.modep; // must check
            var meetup = req.body.meetup;
            var category = req.body.categ; // must check
            //var pic = req.body.pic; // must check

            console.log(itemname);
            console.log(description);
            console.log(sprice);
            console.log(priceinc);
            console.log(stealp)
            console.log(cutoffdt)
            console.log(modep);
            console.log(meetup);
            console.log(category);
        
            if(itemname && description && sprice && priceinc && stealp
                && cutoffdt && modep && meetup && category) {

                Category.findOne({name: category}, function(err, result){
                    
                    Client.findOne({user: req.session.user}, function(err, poster){
        
                        var dateposted = new Date();
                        var datecutoff =  new Date(cutoffdt);

                        var post = new Post({
                            poster: poster,
                            title: itemname,
                            description: description,
            
                            startprice: sprice,
                            currentprice: sprice,
                            stealprice: stealp,
                            incrementprice: priceinc,
            
                            cutoff: datecutoff,
                            paymentmode: modep,
                            details: meetup,
                            category: result,
                            postdate: dateposted,
                            picture: paths

                        })

                        post.save(function(err, result){
                            if (err) res.render("error");
                            console.log("New Post: " + post);

                            var id = req.session.user._id;
                            res.redirect('/success?id=' + result._id +'&user=' + id);
                        });
                    });
                });
            }
            else
            {
                res.render('createpost', {

                    titletag: "Create Post",

                    title: itemname,
                    description: description,
    
                    startprice: sprice,
                    stealprice: stealp,
                    incrementprice: priceinc,
    
                    cutoff: cutoffdt,
                    paymentmode: modep,
                    details: meetup,
                    category: category,
                });
            }
        })
    },

    /* LOADS SUCCESS PAGE FOR CREATING A POST */
    getSuccess: function(req, res){
        console.log("@ getSuccess");

        var clientQuery = {user: req.query.user};
        var postQuery = {_id: req.query.id};

        Client.findOne(clientQuery, function(err, client){

            client = client.toObject();

            Post.findOne(postQuery, function(err, post){

                res.render('postsuccess', {
                    titletag: "Posting Successful!",
                    username: client.username,
                    _id: post._id
                })
            });
        });  
    },

    /* LOADS EDITPOST PAGE */
    getEditPost: function(req, res){

        console.log("@ getEditPost");

        var clientQuery = {user: req.session.user};
        var postQuery = {_id: req.params.postId};

        Client.findOne(clientQuery, function(err, client){

            client = client.toObject();

            Post.findOne(postQuery, function(err, post){

                post = post.toObject();
                
                res.render('editpost', {
                    titletag: "Edit Post",
                    username: client.username,
                    postdetails: post
                })
            });
        });  
    },

    /* SENDS DATA FOR EDIT POST */
    editPost: function(req, res){

        console.log("@ editPost");
        
        Post.findOne({_id: req.params.postId}, function(err, post){

            if(post)
            {
                if(req.body.description)
                post.description = req.body.description;

                if(req.body.details)
                    post.details = req.body.details;

                console.log(req.body.details);
                post.save(function(err){
                    if (err) res.render("error");
                    console.log("Updated post: " + post);
                    res.redirect('/posts/' + post._id);
                });
            }
            else res.render("error");
            
        })
    },


    getSearch: function(req, res){
        console.log("@ getSearch");
        var sortOpt = this.sortOptions(req);
        var posts;
        var filter = {};
        if (req.query.filter)
            filter = {name: req.query.filter};

            if (req.query.search)
            {
                var input = req.query.search;
                var query = {$text: {$search: input}};


            

                    Category.find(filter).exec(function(err, result){
                        Post.find({$text: {$search: input}, category: result}).populate('poster').populate('category').sort(sortOpt).exec(function(err, results){
                            if (err) throw err;
        
                            if (results)
                                posts = multipleMongooseToObj(results);
                            
                            posts.forEach(function (post) {
                                post.postername = post.poster.username;
                                post.posteravatar = post.poster.avatar;
                                post.tagname = post.category.name;
                
                                var timestamp = new Date(post.postdate)
            
                                post.date = timestamp.toDateString();
                                post.time = timestamp.toTimeString().substring(0, 5);

                                post.itemimg = post.picture;
                            });
                            
                            Client.find(query).sort(sortOpt).exec(function(err, result2){
                                if (err) throw err;
        
                                var users = []
        
                                if (result2)
                                    users = multipleMongooseToObj(result2);
        
                                Client.findOne({user: req.session.user}, function(err, result1){
                                    res.render('search', {
                                        titletag: "Search Results for " + input,
                                        isSearch: true,
                                        isTag: false,
                                        query: input,
                                        username: result1.username,
                                        profiledetails: users, 
                                        post: posts
                                    });
                                }); 
                            });
                        });
                    });
            }
            else
            {
                Category.find(filter).exec(function(err, result){
                    Post.find({}).populate('poster').populate('category').sort(sortOpt).exec(function(err, results){
                        if (err) throw err;
        
                        var posts = []
                        if (results)
                            posts = multipleMongooseToObj(results);
        
                        posts.forEach(function (post) {
                            post.postername = post.poster.username;
                            post.posteravatar = post.poster.avatar;
                            post.tagname = post.category.name;
        
                            var timestamp = new Date(post.postdate)
        
                            post.date = timestamp.toDateString();
                            post.time = timestamp.toTimeString().substring(0, 5);

                            post.itemimg = post.picture;
                        });
        
                        Client.findOne({user: req.session.user}, function(err, result){
                            res.render('homepage', {
                                titletag: "Search Results for " + input,
                                username: result.username,
                                post: posts
                            });
                        });
                    });
                });
            }
    },

    /* LOADS ALL THE REPORTS ON USERS */
    getReportedUsers: function(req, res) {
        console.log("@ getReportedUsers");

        Report.find({isResolved: false}).populate('reporteduser').populate('reporter').exec(function(err, results){
            if (err) throw err;

            var temp = []
            var reports = []
            if (reports)
                temp = multipleMongooseToObj(results);

            temp.forEach(function (report) {
                if(!report.reporteduser.isSuspended)
                {
                    report._id = report._id;
                    report.avatar = report.reporteduser.avatar;
                    report.reported = report.reporteduser.username;
                    report.reason = report.reason;
                    report.complaint = report.complaint;
    
                    report.reporter = report.reporter.username;
    
                    var timestamp = new Date(report.datesubmitted)
    
                    report.date = timestamp.toDateString();
                    report.time = timestamp.toTimeString().substring(0, 5);
                    reports.push(report);
                }                
            });

            res.render('admin-users', {
                complaint: reports });
             
        });

    },

    /* ADDS THE REPORT TO THE DATABASE */
    getReportUser: function(req, res) {
        console.log("@ getReportUser");

        var reason = req.body.reason;
        var complaint = req.body.textcomplaint;
        
        if(complaint && reason)
        {
            Client.findOne({user: req.session.user}, function(err, reporter){

                Client.findOne({username: req.params.username}, function(err, reported) {

                    var report = new Report({
                        
                        reporter: reporter,
                        reporteduser: reported,
                        reason: reason,
                        complaint: complaint,
                        isResolved: false
                    })

                    report.save(function(err) {
                        if (err) res.render("error");
                        console.log("New Report: " + report);

                        res.redirect('/user/' + reported.username);

                    })
                })
            });

           
        }


    },

    /* LOADS REPORT USER */
    loadReportUser: function(req, res) {
        console.log("@ loadReportUser");

        Client.findOne({user: req.session.user}).exec(function(err, reporter) {
            if(err) throw err;
            
            Client.findOne({username: req.params.username}, function(err, reported)
            {
                if(err)
                {
                    res.render("error")
                }
                else if(reported.isSuspended)
                {
                    res.render("suspended", {
                        isSelf: false,
                        isOther: true,
                        isPost: false,
                        username: reported.username,
                    });
                }
                else
                {
                    res.render('reportuser', {
                        titletag: "Report",
                        username: reporter.username,
                        usern: reported.username
                    });
                }
            });
        });
    },

    getTagged: function(req, res){
        
        console.log("@ getTagged");
        
        var posts = []

        if(req.session.user.isClient)
        {
            var sortOpt = this.sortOptions(req);
            var filter = {};

            if (req.query.filter)
                filter = {"name": req.query.filter};

            Category.findOne({name: req.params.tagname}).exec(function(err, result){
                                
                        Post.find({category: result}).populate('poster').populate('category').sort(sortOpt).exec(function(err, results){
                            if (err) throw err;
            
                            if (results)
                                posts = multipleMongooseToObj(results);
                            
                            posts.forEach(function (post) {
                                post.postername = post.poster.username;
                                post.posteravatar = post.poster.avatar;
                                post.tagname = post.category.name;
                
                                var timestamp = new Date(post.postdate)
            
                                post.date = timestamp.toDateString();
                                post.time = timestamp.toTimeString().substring(0, 5);

                                post.itemimg = post.picture;
                            });
                            
                            Client.findOne({user: req.session.user}, function(err, client){
                                res.render('search', {
                                    titletag: "Posts tagged with " + req.params.tagname,
                                    isSearch: false,
                                    isTag: true,
                                    query: req.params.tagname,
                                    username: client.username,
                                    //profiledetails: users, 
                                    post: posts
                                });
                            }); 
                        });
            });

        }
    },

    getClientAction: function(req, res){
    
        Client.findOne({user: req.session.user}, function(err, client){

            Post.findOne({_id: req.params.postId}).populate('poster').populate('category').exec(function(err, result){

                if(result.poster.isSuspended)
                {
                    res.render('suspended', {
                        isSelf: false,
                        isOther: false,
                        isPost: true
                    });
                }
                else
                {
                    result.highestbidder = client;
                    //if action is bid, add only increment
                    if(req.params.action == "bid")
                        result.currentprice = (result.currentprice + result.incrementprice >= result.stealprice) ? result.stealprice : (result.currentprice + result.incrementprice);
                    
                    //if action is steal, current price = steal price
                    else if (req.params.action == "steal")
                        result.currentprice = result.stealprice;
    
                    if(result.currentprice == result.stealprice)
                        result.isOpen = false;
    
                    result.save(function(err){
                        if (err) res.render("error");
                        console.log("Updated post: " + result);
    
                        var post = result.toObject();
                        post.postername = result.poster.username;
                        post.biddername = result.highestbidder.username;
    
                        var cutoff = new Date(post.cutoff);
                        var postdate = new Date(post.postdate);
    
                        post.tagname = post.category.name;
                        post.cutoffdate = cutoff.toDateString();
                        post.cutofftime = cutoff.toTimeString().substring(0, 5);
                        post.date = postdate.toDateString();
                        post.time = postdate.toTimeString().substring(0, 5);
    
                        res.redirect('/posts/' + req.params.postId);
                    });    
                }           
            });
        });
    },

    /* UPDATES REPORT AND CLIENT INFO (IF SUSPENDED) */
    getAdminUserAction: function(req, res) {
        console.log("@ getAdminUserAction");

        Report.findOne({_id: req.params.id}).populate('reporteduser').exec(function(err, result) {
            console.log("RESULT: " + result);
            console.log(req.params._id);
            if(result)
            {
                if(req.params.action == 'accept')
                {
                    result.isResolved = true;
                    result.save(function(err) {
                        if (err) res.render("error");
                        console.log("Updated report: " + result);
                        res.redirect('/users');
                    })
                }
                else if (req.params.action == 'suspend')
                {
                    Client.findOne({username: result.reporteduser.username}).exec(function(err, client) {

                        client.isSuspended = true;

                        client.save(function(err) {
                            if (err) res.render("error");
                            console.log("Updated client: " + client);
                        })

                        result.isResolved = true;
                        result.save(function(err) {
                            if (err) res.render("error");
                            console.log("Updated report: " + result);
                            res.redirect('/users');
                        })
                    })
                }
                else
                    res.redirect('/users');
            }
            else
                res.redirect('/users');
        });
    },

    /* UPDATES REPORT AND CLIENT INFO (IF SUSPENDED) */
    getAdminPostAction: function(req, res) {
        console.log("@ getAdminPostAction");

        Post.findOne({_id: req.params.id}).exec(function(err, result) {

            if(result)
            {
                if(req.params.action == 'approve')
                {
                    result.isApproved = true;
                    result.isReviewed = true;

                    console.log("HELLO")
                    result.save(function(err) {
                        if (err) res.render("error");
                        console.log("Updated report: " + result);
                        res.redirect('/');
                    })
                }
                else if (req.params.action == 'delete')
                {
                    Post.deleteOne({_id: req.params.id}, function(err) {
                        if(err) throw err;

                        console.log("Post successfully deleted");

                        res.redirect('/');
                    })
                }
                else
                    res.redirect('/');
            }
            else
                res.redirect('/');
        })

    },

    getDeletePost: function(req, res){
        console.log("@ getDeletePost");

        Post.findOne({_id: req.params.postId}).exec(function(err, result) {
            
            if(result)
            {
                Post.deleteOne({_id: req.params.postId}, function(err) {
                    if(err) throw err;

                    console.log("Post successfully deleted");
                    console.log(req.params.number);
                    if (req.params.number == 1)
                        res.redirect('/user/' + req.params.username);
                    if (req.params.number == 2)
                        res.redirect('/');
                });
            }
            else
                res.redirect('back');
        });
    }, 

    sortOptions: function(req) {

        var sortopt = {"postdate": -1};
        if(req.query.sort == 'dateasc')
            sortopt = {"postdate": 1};
        else if (req.query.sort == 'datedes')
            sortopt = {"postdate": -1};
        else if (req.query.sort == 'stealpricelth')
            sortopt = {"stealprice": 1};
        else if (req.query.sort == 'stealpricehtl')
            sortopt = {"stealprice": -1};
        else if (req.query.sort == 'currentpricelth')
            sortopt = {"currentprice": 1};
        else if (req.query.sort == 'currentpricehtl')
            sortopt = {"currentprice": -1};
        else if (req.query.sort == 'titleaz')
            sortopt = {"title": 1};
        else if (req.query.sort == 'titleza')
            sortopt = {"title": -1};
        
        return sortopt;
    },

};

module.exports = controller;