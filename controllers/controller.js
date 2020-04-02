
const db = require('../models/db.js');

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
                result.hasfb = (result.facebook != null);
                result.hasig = (result.instagram != null);
                result.hastw = (result.twitter != null);

                if(result.avatar == null)
                    result.avatar = "/img/default.png"

                if(req.session.user.isClient) {

                    if(JSON.stringify(req.session.user._id) == JSON.stringify(result.user))
                        res.render('self-profile', {
                            title: result.username,
                            profiledetails: result
                        }); // if the user is viewing their own profile
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
                res.send("oof 404 error cannot find user, error page to be implemented hehe")
            }
            

        });
    },

    /* LOADS EDIT PROFILE */
    editProfile: function(req, res) {
        
        var name = req.params.username;

        var query = {username : name};
        
        db.findOne('client', query, function (result){

            res.render('editprofile', result);

        })
        
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

                if(result.isClient)
                    res.render('homepage') // this.getHomepage(req,res);
                else
                    res.render('admin-posts');
            }
            

        })
    },
    
    /* LOADS HOMEPAGE */
    getHomepage: function(req, res) {
        
        var query = {email: req.session.user.email};

        db.findOne('users', query, function(result) {
            var query2 = {_id: result._id};

            // db.findOne('clients', query2, function(result2) {
            //     // NOT SURE PA KUNG PANO ILALAGAY YUNG SA USER AVATAR HAHAH AND DISPLAY NG POSTS
            // });

            if(req.session.user.isClient)
                res.render('homepage'); // temp. for now ganyan nalang muna haha
            else
                res.render('admin-posts');
        })
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
};

module.exports = controller;