
const db = require('../models/db.js');

const controller = {
    
    getFavicon: function (req, res) {
        res.status(204);
    },
  
    /* LOADS A USER'S PROFILE */
    getProfile: function(req, res) {
        var name = req.params.username;

        var query = {username : name};

        db.findOne('client', query, function(result) {

            if(result != null)
            {
                result.hasfb = (result.facebook != null);
                result.hasig = (result.instagram != null);
                result.hastw = (result.twitter != null);

                if(result.avatar == null)
                    result.avatar = "/img/default.png"

                if(req.session.user.isClient)
                    res.render('profile', {
                        title: result.username,
                        profiledetails: result
                    });
                else
                    res.render('adminprofile', result);
            }
            else
            {
                res.send("oof 404 error cannot find user, error page to be implemented hehe")
            }
            

        });
    },

    editProfile: function(req, res) {
        if(req.session.user != undefined) {
            var name = req.params.username;

            var query = {username : name};
            
            db.findOne('client', query, function (result){

                res.render('editprofile', result);

            })
        }
        else
            res.render('home');
        
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
                res.redirect('home');
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

            db.findOne('clients', query2, function(result2) {
                // NOT SURE PA KUNG PANO ILALAGAY YUNG SA USER AVATAR HAHAH AND DISPLAY NG POSTS
            });
        })
    },

    /* LOADS REGISTRATION */
    getRegistration: function(req, res) {
        res.render('registration');
    },

    /* LOADS A POST */
    getPost: function(req, res) {
        if(req.session.user != undefined) {
            var post = req.params.postId;

            var query = {post_id : post};

            db.findOne('post', query, function(result) {
                if(req.session.user.isClient)
                    res.render('viewpost', result);
                else
                    res.render('admin-viewpost', result);
            })
        }
        else
            res.render('home');
    },

    /* LOADS REVIEWS */
    getReviews: function(req, res) {
        if(req.session.user != undefined) {

            var username = req.params.username;

            var query1 = {revieweduser: username};
            var query2 = {username: this.username};

            db.findOne('review', query1, function(result){
                if(req.session.user.isClient)
                    res.render('profilereviews', result);
                else
                    res.render('admin-profilereviews', result);
            });
            
        //    db.findMany('review', query1, function(result){

        //         db.findOne('user', query2, function(result2) {
        //             res.render('profilereviews', {
        //                 dp: result,
        //                 review: result2});
        //         });

        //    });
            
        }
        else
            res.render('home');
    }
};

module.exports = controller;