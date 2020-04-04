const async = require('async');

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/bids", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
var mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'MongoDB connection error'));

const Category  = require('../models/category.js');
const Client    = require('../models/client.js');
const File      = require('../models/file.js');
const Post      = require('../models/post.js');
const Report    = require('../models/report.js');
const Review    = require('../models/review.js');
const User      = require('../models/user.js');


// function that converts query results to obj
// got code from https://dev.to/abourass/how-to-solve-the-own-property-issue-in-handlebars-with-mongoose-2l7c

const multipleMongooseToObj = (arrayOfMongooseDocuments) => {
    const tempArray = [];
    if (arrayOfMongooseDocuments.length !== 0){
      arrayOfMongooseDocuments.forEach(doc => tempArray.push(doc.toObject()));
    }
    return tempArray;
};

const mongooseToObj = (doc) => { if (doc == null){ return null; } return doc.toObject(); };

    module.exports = {
        mongooseToObj,
        multipleMongooseToObj,
};


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
            if (viewedclient != null && viewedclient != undefined)
            {

                viewedclient = viewedclient.toObject();

                viewedclient.hasfb = (viewedclient.facebook);
                viewedclient.hasig = (viewedclient.instagram);
                viewedclient.hastw = (viewedclient.twitter);

                viewedclient.avatar = (viewedclient.avatar == null) ? "/img/default.png" : viewedclient.avatar;

                if(req.session.user.isClient) // if the user is a client
                {
                    // if user is viewing their own profile
                    if(JSON.stringify(req.session.user._id) == JSON.stringify(viewedclient.user)){

                        Post.find({poster: viewedclient._id}).populate('poster').populate('category').sort({postdate : -1}).exec(function(err, results){
                            var posts = [];

                            if(results != null)
                                posts = multipleMongooseToObj(results);

                            posts.forEach(function (post) {
                                post.postername = post.poster.username;
                                post.tagname = post.category.name;
            
                                var timestamp = new Date(post.postdate)
            
                                post.date = timestamp.toDateString();
                                post.time = timestamp.toTimeString();
                            })

                            res.render('self-profile', {
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
                                
                                if(results != null)
                                    posts = multipleMongooseToObj(results);

                                posts.forEach(function (post) {
                                    post.postername = post.poster.username;
                                    post.tagname = post.category.name;
                
                                    var timestamp = new Date(post.postdate)
                
                                    post.date = timestamp.toDateString();
                                    post.time = timestamp.toTimeString();
                                })
    
                                res.render('profile', {
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
                        
                        if(results != null)
                            posts = multipleMongooseToObj(results);

                        posts.forEach(function (post) {
                            post.postername = post.poster.username;
                            post.tagname = post.category.name;
        
                            var timestamp = new Date(post.postdate)
        
                            post.date = timestamp.toDateString();
                            post.time = timestamp.toTimeString();
                        })

                        res.render('admin-profile', {
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

        //TODO may error ba if passwords do not match

        if (req.body.pw && JSON.stringify(req.body.pw) == JSON.stringify(req.body.cpw))
        {
            User.findOne({_id: req.session.user._id}, function(err, user){
                user.password = req.body.pw;

                user.save(function(err){
                    if (err) throw err;
                    console.log("Updated user: " + user);
                });
            })
        }

        Client.findOne({user: req.session.user}, function(err, client){

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
                if (err) throw err;
                console.log("Updated client: " + client);
                res.redirect('/user/' + client.username);
            });
        })
    },

    /* LOADS EDIT PROFILE */
    editProfile: function(req, res) { 
        console.log("@ editProfile");
        
        query = {user: req.session.user}

        Client.findOne(query, function(err, result){

            result = result.toObject();
            result.avatar = (result.avatar == null) ? "/img/default.png" : result.avatar;

            res.render('editprofile', {
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

            Post.find({}).populate('poster').populate('category').sort({postdate : -1}).exec(function(err, results){
                if (err) throw err;

                var posts = []
                if (results != null)
                    posts = multipleMongooseToObj(results);

                posts.forEach(function (post) {
                    post.postername = post.poster.username;
                    post.tagname = post.category.name;

                    var timestamp = new Date(post.postdate)

                    post.date = timestamp.toDateString();
                    post.time = timestamp.toTimeString();
                })

                Client.findOne({user: req.session.user}, function(err, result){
                    res.render('homepage', {
                        username: result.username,
                        post: posts
                    });
                });
            })

        }
        else {

            Post.find({isApproved: false, isReviewed: false}).populate('poster').populate('category').sort({postdate : -1}).exec(function(err, results){
                if(err) throw err;
                var posts = []
                if (results != null)
                    posts = multipleMongooseToObj(results);

                posts.forEach(function (post) {
                    post.postername = post.poster.username;
                    post.tagname = post.category.name;

                    var timestamp = new Date(post.postdate)

                    post.date = timestamp.toDateString();
                    post.time = timestamp.toTimeString();
                })

                res.render('admin-posts', {
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

            if (result == null)
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

                        var posts = []
                        if (results != null)
                            posts = multipleMongooseToObj(results);

                        posts.forEach(function (post) {
                            post.postername = post.poster.username;
                            post.tagname = post.category.name;
        
                            var timestamp = new Date(post.postdate)
        
                            post.date = timestamp.toDateString();
                            post.time = timestamp.toTimeString();
                        })

                        Client.findOne({user: req.session.user}, function(err, result){
                            res.render('homepage', {
                                username: result.username,
                                post: posts
                            });
                        });
                    })
                }
                else {

                    Post.find({isApproved: false, isReviewed: false}).populate('poster').populate('category').sort({postdate : -1}).exec(function(err, results){
                        if(err) throw err;

                        var posts = []
                        if (results != null)
                            posts = multipleMongooseToObj(results);
        
                        posts.forEach(function (post) {
                            post.postername = post.poster.username;
                            post.tagname = post.category.name;
        
                            var timestamp = new Date(post.postdate)
        
                            post.date = timestamp.toDateString();
                            post.time = timestamp.toTimeString();
                        });
        
                        res.render('admin-posts', {
                            post: posts
                        });
                    });
                }
            }
        });
    },

    /* LOADS REGISTRATION */
    getRegistration: function(req, res) {
        console.log("@ getRegistration");
        
        var idnum = req.body.idnum;
        var email = req.body.email;
        var username = req.body.username;
        var phone = req.body.phone;
        var pw = req.body.password;
        var cpw = req.body.confirmpassword;

        console.log(req.body.idnum)
        console.log(req.body.email)
        console.log(req.body.username)
        console.log(req.body.phone)
        console.log(req.body.password)
        console.log(req.body.confirmpassword)

        if( idnum != "" && idnum.length == 8 && idnum.match(/^-{0,1}\d+$/) &&
            email != "" &&
            phone != "" && phone.length == 11 && phone.match(/^-{0,1}\d+$/) &&
            pw != "" && cpw != "" && pw == cpw) {
                console.log("HELLO");

            var user = new User({
                email: email,
                password: pw,
                isClient: true
            });

            user.save(function(err){
                if (err) throw err;
                console.log('New User: ' + user);
    
                var client = new Client({
                    user: user,
                    id_num: idnum,
                    username: username,

                    number: parseInt(phone),
                    bio: null,
                    twitter: null,
                    facebook: null,
                    instagram: null,
                    hasfb: null,
                    hasig: null,
                    hastw: null,
                    isSuspended: false,
                    likedposts: null,
                    avatar: null
                });

                client.save(function(err){
                    if (err) throw err;
                    console.log('New Client: ' + client);
                    res.render('welcome');
                });
            });
        }
        else
        {
            //TODO
        }
    },

    /* CHECKS IF THE EMAIL IS ALREADY TAKEN. */
    checkEmail: function(req, res) {
        console.log("@ checkEmail");

        var query = {email: req.body.email};

        User.findOne({email: req.body.email}, function(err, result){
            res.send(result);
        });
    },

    /* CHECKS IF THE USERNAME IS ALREADY TAKEN. */
    checkUsername: function(req, res) {
        console.log("@ checkUsername");

        var query = {username: req.body.username};
        
        Client.findOne({username: req.body.username}, function(err, result){
            res.send(result);
        });
    },

    /* LOADS A POST */
    getPost: function(req, res) {
        console.log("@ getPost");

        Post.findOne({_id: req.params.postId}).populate('poster').populate('highestbidder').exec(function(err, result){

            var post = result.toObject();
            post.postername = result.poster.username;
            if(result.highestbidder != null)
                post.biddername = result.highestbidder.username;
            else post.biddername = "-";

            var cutoff = new Date(post.cutoff);
            var postdate = new Date(post.postdate);

            post.cutoffdate = cutoff.toDateString();
            post.cutofftime = cutoff.toTimeString();
            post.date = postdate.toDateString();
            post.time = postdate.toTimeString();

            //find current session client
            Client.findOne({user: req.session.user}, function(err, result){

                if(req.session.user.isClient) {
                    res.render('viewpost', {
                        username: result.username,
                        post: post
                    });
                }

                else{
                    res.render('admin-viewpost', post);
                }
            });
        });
    },

    /* LOADS REVIEWS */
    getReviews: function(req, res) {
        console.log("@ getReviews");

        Client.findOne({username: req.params.username}, function(err, viewedclient){

            // if profile exists
            if (viewedclient != null && viewedclient != undefined)
            {

                viewedclient = viewedclient.toObject();

                viewedclient.hasfb = (viewedclient.facebook);
                viewedclient.hasig = (viewedclient.instagram);
                viewedclient.hastw = (viewedclient.twitter);

                viewedclient.avatar = (viewedclient.avatar == null) ? "/img/default.png" : viewedclient.avatar;
                
                if(req.session.user.isClient)
                {
                    // if user is viewing their own profile
                    if(JSON.stringify(req.session.user._id) == JSON.stringify(viewedclient.user)){

                        Review.find({revieweduser: viewedclient._id}).populate('reviewer').exec(function(err, results){
                            var reviews = [];

                            if(results != null)
                                reviews = multipleMongooseToObj(results);
                            
                                console.log("HERE");
                                reviews.forEach(function (review) {

                                review.checkedStars = parseInt(review.num_stars);
                                review.uncheckedStars = 5 - parseInt(review.num_stars);
                                review.username = review.reviewer.username;
                                review.avatar = (review.avatar == null) ? "/img/default.png" : review.avatar;
                                review.text = review.review;
                                
                            })

                            res.render('self-profilereviews', {
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

                            Review.find({revieweduser: viewedclient._id}).populate('reviewer').exec(function(err, results){
                                
                                var reviews = [];
                                
                                if(results != null)
                                    reviews = multipleMongooseToObj(results);

                                reviews.forEach(function (review) {
                                    
                                    review.checkedstars = parseInt(review.num_stars);
                                    review.uncheckedstars = 5 - parseInt(review.num_stars);
                                    review.username = review.reviewer.username;
                                    review.avatar = (review.avatar == null) ? "/img/default.png" : review.avatar;
                                    review.text = review.review;

                                })
    
                                res.render('profilereviews', {
                                    title: viewedclient.username,
                                    username: currentclient.username,
                                    profiledetails: viewedclient,
                                    review: reviews
                                });
                            });
                        });
                    }   
                }
                else
                {
                    Client.find({username: req.params.username}).exec(function(err, reviewed){
                    
                        reviewed = reviewed.toObject();

                        Review.find({revieweduser: reviewed._id}).populate('reviewer').exec(function(err, results){
                                
                            var reviews = [];
                            
                            if(results != null)
                                reviews = multipleMongooseToObj(results);
    
                            reviews.forEach(function (review) {
                                
                                review.checkedStars = parseInt(review.num_stars);
                                review.uncheckedStars = 5 - parseInt(review.num_stars);
                                review.username = review.reviewer.username;
                                review.avatar = (review.avatar == null) ? "/img/default.png" : review.avatar;
                                review.text = review.review;

                            })
    
                            res.render('admin-profilereviews', {
                                title: viewedclient.username,
                                profiledetails: viewedclient,
                                review: reviews
                            });
                        });
                    
                    
                    })
                    
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

        if((reviewtext != null || reviewtext != undefined || reviewtext != " ") && stars != "none")
        {
            Client.findOne({user: req.session.user}, function(err, poster){

                Client.findOne({username: req.params.username}, function(err, reviewed) {

                    var review = new Review({
                        
                        num_stars: stars,
                        reviewer: poster,
                        revieweduser: reviewed,
                        review: reviewtext
                    })

                    review.save(function(err) {
                        if(err) throw err;
                        console.log("New Review: " + review);

                        res.redirect(req.get('referer'));

                    })
                })
            });

           
        }
        else
            res.send("MISSING FIELDS");
    },

    /* LOADS EDIT POST */
    // getEditPost: function(req, res) {
    //     res.render('editpost');
    // }, remove for now

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
                username: result.username
            });
        })
    },


    /* ADDS NEW POST INTO DATABASE */
    postCreatePost: function(req, res) {
        console.log("@ postCreatePost");
        
        var itemname = req.body.itemname;
        var description = req.body.description;
        var sprice = req.body.sprice;
        var priceinc = req.body.priceinc;
        var stealp = req.body.stealp;
        var cutoffdt = req.body.cutoffdt;
        var modep = req.body.modep; // must check
        var meetup = req.body.meetup;
        var category = req.body.categ; // must check
        var pic = req.body.pic; // must check
        
        if( itemname != null && description != null && sprice != null & priceinc != null &&
            stealp != null /*&&  cutoffdt*/ && modep != null && meetup != null && category != null /*&&  pic*/ ) {

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
                        paymentmode: "Cash",//TO DO: ayaw gumana using modep
                        details: meetup,
                        category: result,
                        postdate: dateposted
                        //pictures: pic,
                    })

                    post.save(function(err){
                        if (err) throw err;
                        console.log("New Post: " + post);

                        var id = req.session.user._id;
                        res.redirect('/success?title=' + itemname +'&user=' + id);
                    });
                });
            });
        }
        else
        {
            res.send("MISSING FIELDS");
        }
    },

    /* LOADS POSTSUCCESS */
    getSuccess: function(req, res){
        console.log("@ getSuccess");

        var clientQuery = {user: req.query.user};
        var postQuery = {title: req.query.title};

        Client.findOne(clientQuery, function(err, client){

            client = client.toObject();

            Post.findOne(postQuery, function(err, post){

                res.render('postsuccess', {
                    username: client.username,
                    _id: post._id
                })
            });
        });  
    },

    
    getSearch: function(req, res){
        console.log("@ getSearch");
        
        var posts;

        if(req.session.user.isClient){
            if (req.query.search)
            {
                var input = req.query.search;
                var query = {$text: {$search: input}};

                //TODO use models
                
                db.findOne('clients', query, function(result1){

                    db.findMany('posts', query, null, null, function(result2){
                        
                        if(!result1 && result2 == [])
                        {
                            res.render('search', {
                                query: input,
                                profileresults: "No users found.",
                                postresults: "No posts found."
                            });

                        }
                        else if(!result1)
                        {
                            res.render('search', {
                                query: input,
                                profileresults: "No users found.",
                                post: result2,
                            });
                        }
                        else if(result2 == [])
                        {
                            res.render('search', {
                                query: input,
                                profiledetails: result1,
                                postresults: "No posts found."
                            });
                        }
                        else
                        {
                            if(result1.avatar == null)
                                result1.avatar = "/img/default.png"
                                
                            res.render('search', {
                                query: input,
                                profiledetails: result1,
                                post: result2,
                            });
                        }
                    });
                        
                });
            }
            else
            {
                Post.find({}).populate('poster').populate('categories').sort({postdate : -1}).exec(function(err, results){
                    if (err) throw err;
    
                    var posts = []
                    if (results != null)
                        posts = multipleMongooseToObj(results);
    
                    posts.forEach(function (post) {
                        post.postername = post.poster.username;
                        post.tagname = post.category.name;
    
                        var timestamp = new Date(post.postdate)
    
                        post.date = timestamp.toDateString();
                        post.time = timestamp.toTimeString();
                    })
    
                    Client.findOne({user: req.session.user}, function(err, result){
                        res.render('homepage', {
                            username: result.username,
                            post: posts
                        });
                    });
                })
            }
        }
        else{
            res.redirect('/');
        }

    },

};

module.exports = controller;