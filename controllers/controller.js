
const db = require('../models/db.js');
var ObjectId = require('mongodb').ObjectID;

const controller = {
    
    getFavicon: function (req, res) {
        res.status(204);
    },
  
    /* LOADS A USER'S PROFILE */
    getProfile: function(req, res) {
        var name = req.params.username;
        var query = {username : name};

        db.findOne('clients', query, function(result) {

            if(result != null && result != undefined)
            {
                result.hasfb = (result.facebook);
                result.hasig = (result.instagram);
                result.hastw = (result.twitter);

                if(result.avatar == null)
                    result.avatar = "/img/default.png"

                if(req.session.user.isClient) {

                    if(JSON.stringify(req.session.user._id) == JSON.stringify(result.user)){
                        
                        var client = result;

                        query = {poster: ObjectId(result._id)};

                        db.findMany('posts', query, null, null, function(result) {

                            res.render('self-profile', {
                                title: client.username,
                                username: client.username,
                                profiledetails: client,
                                post: result
                            }); // if the user is viewing their own profile
                        })
                        
                    }
                    else {

                        var profiledeets = result;

                        var query = {user: ObjectId(req.session.user._id)};

                        db.findOne('clients', query, function(result) {

                            var username = result.username;

                            query = {poster: ObjectId(profiledeets._id)};

                            db.findMany('posts', query, null, null, function(result) {

                                res.render('profile', {
                                    title: profiledeets.username,
                                    username: username,
                                    profiledetails: profiledeets,
                                    post: result
                                }); // if the user is viewing another user's profile

                            })
                             
                        })
                        
                    }
                        
                }
                else
                    res.render('adminprofile', result);
            }
            else
            {
                res.render('error', result);
            }
            

        });
    },

    postProfile: function(req, res, next) {

        var newvalues;
        var filter = {user: ObjectId(req.session.user._id)};

        if (req.body.pw && JSON.stringify(req.body.pw) == JSON.stringify(req.body.cpw))
        {
            newvalues =  {$set: {
                password: req.body.password}
            };
            db.updateOne('users', filter, newvalues);
        }    
        
        if(req.body.tw)
        {
            newvalues =  {$set: {
                twitter: req.body.tw, hastw: true}};
            db.updateOne('clients', filter, newvalues);
        }
        else
        {
            newvalues =  {$set: {
                twitter: req.body.tw, hastw: false}};
            db.updateOne('clients', filter, newvalues);
        }

        if(req.body.fb)
        {
            newvalues =  {$set: {
                facebook: req.body.fb, hasfb: true}};
            db.updateOne('clients', filter, newvalues);
        }
        else
        {
            newvalues =  {$set: {
                facebook: req.body.fb, hasfb: false}};
            db.updateOne('clients', filter, newvalues);
        }

        if(req.body.ig)
        {
            newvalues =  {$set: {
                instagram: req.body.ig, hasig: true}};
            db.updateOne('clients', filter, newvalues);
        }
        else
        {
            newvalues =  {$set: {
                instagram: req.body.ig, hasig: false}};
            db.updateOne('clients', filter, newvalues);
        }

        if(req.body.bio)
        {
            newvalues = {$set: {
                bio: req.body.bio
            }};
            db.updateOne('clients', filter, newvalues);
        }

        if(req.body.contactd)
        {
            newvalues = {$set: {
                number: req.body.contactd
            }};
            db.updateOne('clients', filter, newvalues);
        }
        
        this.getProfile(req, res);
    },

    /* LOADS EDIT PROFILE */
    editProfile: function(req, res) {
        
        var id = req.session.user._id;
        var query = {user :  ObjectId(id)};
        
        db.findOne('clients', query, function (result){

            var profiledeets = result;

            var query = {user: ObjectId(req.session.user._id)};

            db.findOne('clients', query, function(result) {

                if(profiledeets.avatar == null)
                    profiledeets.avatar = "/img/default.png"

                res.render('editprofile', {
                    username: result.username,
                    profiledetails: profiledeets
                });

            })
            
        });
        
    },

    /* LOADS HOMEPAGE */
    getHomepage: function(req, res) {
        
        var posts;

        if(req.session.user.isClient){

            db.findMany('posts', {}, null, null, function(result){

                posts = result;
                
                var query = {user: ObjectId(req.session.user._id)};

                db.findOne('clients', query, function(result) {
                    
                    res.render('homepage', {
                        username: result.username,
                        post: posts
                    });

                })

            });
        }
        else {

            db.findMany('posts', {isApproved: false, isReviewed: false}, null, null, function(result) {
                
                posts = result;
                
                res.render('admin-posts', {
                    post: posts
                });
            
            });
        }

        // async.series([
        //     function(callback)
        //     {
        //         db.findMany('posts', {}, null, null, function(result){
        //             posts = result;
        //         });
        //         callback(null, result)
        //     }
        // ], function(err){
        //     if (err) return callback(err);
        //     if(req.session.user.isClient)
        //         res.render('homepage', {
        //             post: posts
        //         });
        //     else
        //         res.render('admin-posts');
        // });
    },

    /*  
        CHECKS IF THE USER LOGGING IN IS VALID. IF THE EMAIL AND PASSWORD MATCHES
        A DOCUMENT IN THE DATABASE, 'homepage' IS RENDERED, ELSE, USER IS REDIRECTED
        BACK TO THE LOGIN PAGE 
    */
    getLogIn : function(req, res) {

        var query = {email:     req.body.email,
                     password:  req.body.password};
                     console.log("GET LOGIN")
        db.findOne('users', query, function(result) {
            
            if(result == null)
            {
                res.status(404).send();
                res.redirect('/');
            }
            else
            {
                req.session.user = result;

                var posts;

                if(req.session.user.isClient){
        
                    db.findMany('posts', {}, null, null, function(result){
        
                        posts = result;
                        
                        var query = {user: ObjectId(req.session.user._id)};
                        console.log(req.session.user);
                        db.findOne('clients', query, function(result) {
                            console.log(result);
                            res.render('homepage', {
                                username: result.username,
                                post: posts
                            });

                        })
                        
        
                    });
                }
                else {
        
                    db.findMany('posts', {isApproved: false, isReviewed: false}, null, null, function(result) {
                        
                        posts = result;
                        
                        res.render('admin-posts', {
                            post: posts
                        });
                    
                    });
                }
            }
        })
    },

    /* LOADS REGISTRATION */
    getRegistration: function(req, res) {
        
        var idnum = req.body.idnum;
        var email = req.body.email;
        var username = req.body.username;
        var phone = req.body.phone;
        var pw = req.body.password;
        var cpw = req.body.confirmpassword;

        // console.log(idnum);
        // console.log(email);
        // console.log(username);
        // console.log(phone);
        // console.log(pw);
        // console.log(cpw);

        if( idnum != "" && idnum.length == 8 && idnum.match(/^-{0,1}\d+$/) &&
            email != "" &&
            phone != "" && phone.length == 11 && phone.match(/^-{0,1}\d+$/) &&
            pw != "" && cpw != "" && pw == cpw) {
                console.log("HELLO");
            var doc = {
                email: email,
                password: pw,
                isClient: true
            };

            db.insertOne('users', doc);

            db.findOne('users', {email: email, password: pw}, function(result) {
                console.log("HERE")
                doc = {

                    user: result,
                    idnum: idnum,
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

                };
                
                db.insertOne('clients', doc);
                
            })

            res.render('welcome');
        }
        else
        {
        }
    },

    checkEmail: function(req, res) {

        var query = {email: req.body.email};
        
        db.findOne('users', query, function(result) {

            res.send(result);

        })
         
    },

    checkUsername: function(req, res) {

        var query = {username: req.body.username};
        
        db.findOne('clients', query, function(result) {
            
            res.send(result);

        })
         
    },

    /* LOADS A POST */
    getPost: function(req, res) {

        var post;

        var query = {_id : ObjectId(req.params.postId)};

        db.findOne('posts', query, function(result) {
            
            post = result;

            post.cutofftime = post.cutoff.toTimeString();
            post.cutoffdate = post.cutoff.toDateString();
            post.time = post.postdate.toTimeString();
            post.date = post.postdate.toDateString();

            db.findOne('clients', {_id: post.poster}, function(result){
                post.postername = result.username;

                query = {user: ObjectId(req.session.user._id)};

                db.findOne('clients', query, function(result) {

                    if(req.session.user.isClient) {

                        db.findOne('clients', {_id: post.highestbidder}, function(result){
                            
                            post.biddername = result.username;
                            console.log(result);

                            res.render('viewpost', {
                                username: result.username,
                                post: post
                            });
                        });
                    }
                    else
                    {
                        console.log(post);
                        res.render('admin-viewpost', post);
                    }
                })

            });
            
        })

    },

    /* LOADS REVIEWS */
    getReviews: function(req, res) {

        var name = req.params.username;

        var query = {username: name};

        db.findOne('clients', query, function(result){
            
            if(result != null && result != undefined){
            
                if(req.session.user.isClient) {

                    if(req.session.user.isClient) {

                        if(JSON.stringify(req.session.user._id) == JSON.stringify(result.user)) {

                            res.render('self-profilereviews',  {
                                title: result.username,
                                username: result.username,
                                profiledetails: result
                            }); // if the user is viewing their own profile reviews

                        }
                        else {
                            var profiledeets = result;

                            query = {user: ObjectId(req.session.user._id)};

                            db.findOne('clients', query, function(result) {

                                res.render('profilereviews',  {
                                    title: profiledeets.username,
                                    username: result.username,
                                    profiledetails: profiledeets
                                }); // if the user is viewing another user's profile reviews

                            })
                            

                        }
                            
                    }

                }
                else
                    res.render('admin-profilereviews', result);

            }
            else
                res.send("USER NOT FOUND");
        });
        
    //    db.findMany('review', query1, function(result){

    //         db.findOne('user', query2, function(result2) {
    //             res.render('profilereviews', {
    //                 dp: result,
    //                 review: result2});
    //         });

    //    });
            
    },

    /* LOADS FF PAGE */
    getFFs: function(req, res) {
        // MUST ADD
    },

    /* LOADS EDIT POST */
    // getEditPost: function(req, res) {
    //     res.render('editpost');
    // }, remove for now

    /* VALIDATES INFORMATION ENTERED AT LOG IN PAGE*/
    checkLogIn: function(req, res) {
        console.log("CHECKLOGIN")
        var email = req.body.email;
        var password = req.body.password;

        var query = {email: email, password: password};

        db.findOne('users', query, function(result) {

            res.send(result);

        })
         
    },

    /* ADDS NEW POST INTO DATABASE */
    getCreatePost: function(req, res) {

        var itemname = req.query.itemname;
        var description = req.query.description;
        var sprice = req.query.sprice;
        var priceinc = req.query.priceinc;
        var stealp = req.query.stealp;
        var cutoffdt = req.query.cutoffdt;
        var modep = req.query.modep; // must check
        var meetup = req.query.meetup;
        var categories = req.query.categ; // must check
        var pic = req.query.pic; // must check
        
        console.log(req.query.modep);
        if( itemname != undefined && description != undefined && sprice != undefined && priceinc != undefined &&
            stealp != undefined &&  cutoffdt != undefined && modep != undefined && categories != undefined &&  pic != undefined) {

            var doc = {
                poster: req.session.user,
                name: itemname,
                description: description,
                numFFs: 0,

                start_price: sprice,
                current_price: sprice,
                increment_price: priceinc,

                highest_bidder: null,
                cutoff_date: cutoffdt,
                cutoff_time: cutoffdt,
                payment_mode: modep,
                categories: categories,
                post_date: new Date(),
                pictures: pic,
                
                isOpen: true,
                isApproved: false,
                isReviewed: false
            }

            db.insertOne("posts", doc);

            res.redirect('/');
        }
    },

    getSearch: function(req, res){
        var posts;

        if(req.session.user.isClient){
            if (req.query.search)
            {
                var input = req.query.search;
                var query = {$text: {$search: input}};
                
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
                db.findMany('posts', {}, null, null, function(result){
                    posts = result;
                    res.render('homepage', {
                        post: posts
                    });
                });
            }
        }
        else{
            res.redirect('/');
        }

    },

};

module.exports = controller;