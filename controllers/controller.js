
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
                        res.render('self-profile', {
                            title: result.username,
                            profiledetails: result
                        }); // if the user is viewing their own profile
                    }
                    else
                        res.render('profile', {
                            title: result.username,
                            profiledetails: result
                        }); // if the user is viewing another user's profile 
                        
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

        var query = filter;

        db.findOne('clients', query, function(result) {
            if(result.avatar == null)
            result.avatar = "/img/default.png"

            res.render('self-profile', {
                title: result.username,
                profiledetails: result
            }); 
        });
    },

    /* LOADS EDIT PROFILE */
    editProfile: function(req, res) {
        
        var id = req.session.user._id;
        var query = {user :  ObjectId(id)};
        
        db.findOne('clients', query, function (result){
            if(result.avatar == null)
                result.avatar = "/img/default.png"
            res.render('editprofile', {
                profiledetails: result
            });
        });
        
    },

    /*  
        CHECKS IF THE USER LOGGING IN IS VALID. IF THE EMAIL AND PASSWORD MATCHES
        A DOCUMENT IN THE DATABASE, 'homepage' IS RENDERED, ELSE, USER IS REDIRECTED
        BACK TO THE LOGIN PAGE 
    */
    getLogIn : function(req, res) {

        var query = {email:     req.body.email,
                     password:  req.body.password};
        
        db.findOne('users', query, function(result) {
            
            if(result == null)
            {
                res.status(404).send();
                res.redirect('/');
                //EDIT
            }
            else
            {
                req.session.user = result;

                // if(result.isClient)
                //     res.render('homepage') // this.getHomepage(req,res);
                // else
                //     res.render('admin-posts');

                var posts;

                if(req.session.user.isClient){
                    db.findMany('posts', {}, null, null, function(result){
                        posts = result;
                        res.render('homepage', {
                            post: posts
                        });
                    });
                }
                else
                    res.render('admin-posts');
            }
        })
    },
    
    /* LOADS HOMEPAGE */
    getHomepage: function(req, res) {
        
        var posts;

        if(req.session.user.isClient){
            db.findMany('posts', {}, null, null, function(result){
                posts = result;
                res.render('homepage', {
                    post: posts
                });
            });
        }
        else
            res.render('admin-posts');

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

    /* LOADS REGISTRATION */
    getRegistration: function(req, res) {
        res.render('registration');
    },

    /* LOADS A POST */
    getPost: function(req, res) {

        var post = req.params.postId;

        var query = {post_id : post};

        db.findOne('post', query, function(result) {
            if(req.session.user.isClient)
                res.render('viewpost', result);
            else
                res.render('admin-viewpost', result);
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

                        if(JSON.stringify(req.session.user._id) == JSON.stringify(result.user))
                            res.render('self-profilereviews',  {
                                title: result.username,
                                profiledetails: result
                            }); // if the user is viewing their own profile reviews
                        else
                            res.render('profilereviews',  {
                                title: result.username,
                                profiledetails: result
                            }); // if the user is viewing another user's profile reviews
                            
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

    /* LOADS CREATE POST */
    getCreatePost: function(req, res) {
        res.render('createpost');
    },

    /* LOADS EDIT POST */
    // getEditPost: function(req, res) {
    //     res.render('editpost');
    // }, remove for now

    /* VALIDATES INFORMATION ENTERED AT LOG IN PAGE*/
    checkLogIn: function(req, res) {
        
        var email = req.body.email;
        var password = req.body.password;

        var query = {email: email, password: password};

        db.findOne('users', query, function(result) {
            console.log("RESULT: " + result);
            res.send(result);

        })
    },

 /*   getCreatePost: function(req, res) {

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
            post_date: Date.now(),
            pictures: pic,
            
            isOpen: true,
            isApproved: false,
            isReviewed: false
        }

        db.insertOne("posts", doc);

    } */

    getSearch: function(req, res){
        var posts;

        if(req.session.user.isClient){
            if (req.query.search)
            {
                var input = req.query.search;
                var query = {username: input};
                db.findOne('clients', query, function(result){
                    if(result != null && result != undefined){

                        if(result.avatar == null)
                        result.avatar = "/img/default.png"

                        res.render('search', {
                                profiledetails: result
                        }); 
                            
                    }
                    else
                    {
                        res.render('error', result);
                    }
                });

                // query = {name: input}
                // db.findMany('posts', query, null, null, function(result){
                //     if (result != null && result != undefined)
                //     {
                //         res.render('search', {
                //             post: result
                //         });
                //     }
                //     else
                //     {
                //         res.render('error', result);
                //     }
                // });
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
            res.render('error', result);
        }

    },

};

module.exports = controller;