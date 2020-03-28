
const db = require('../models/db.js');

var isAdmin = false; //temp

const controller = {
    
    getFavicon: function (req, res) {
        res.status(204);
    },
  
    /* LOADS A USER'S PROFILE */
    getProfile: function(req, res) {
        var name = req.params.username;

        var query = {username : name};

        db.findOne('client', query, function(result) {

            // result.hasfb = (result.facebook != null);
            // result.hasig = (result.instagram != null);
            // result.hastw = (result.twitter != null);

            // if(result.avatar == null)
            //     result.avatar = "img/default.png"

            // res.render('profile', {
            //     ua = result.avatar /*temp*/,
            //     dp = result.avatar,
            //     profileusername = result.username,
            //     checkedstars = result.rating /*temp*/,
            //     uncheckedstars = 5 - result.rating,
            //     bio = result.bio,
            //     hasfb = this.hasfb,
            //     fb = result.facebook,
            //     hastwitter = this.hastw,
            //     tw = result.twitter,
            //     hasig = this.hasig,
            //     ig = result.instagram,
            //     contactdetails = result.number,
            //     //post = /*not sure pa */res
            
            // }) 
            //console.log(result[0].facebook);

            if(!isAdmin)
                res.render('profile', result);
            else
                res.render('adminprofile', result);

        });
    },

    editProfile: function(req, res) {
        var name = 'nemumu'; //try lang kung gagana hahaha

        var query = {username : name};
        
        db.findOne('client', query, function (result){
            console.log(result);

            res.render('editprofile', result);
        })
        
    },

    /* LOADS LOG IN PAGE */
   getLogInPage : function() {
        res.render('home');
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
            if(!isAdmin)
                res.render('viewpost', result);
            else
                res.render('admin-viewpost', result);
        })
    },

    /* LOADS REVIEWS */
    getReviews: function(req, res) {
        var username = req.params.username;

        var query1 = {revieweduser: username};
        var query2 = {username: this.username};

        db.findMany('review', query1, function(result){

            db.findOne('user', query2, function(result2) {
                res.render('profilereviews', {
                    dp: result,
                    review: result2});
            });

        });
    }
};

module.exports = controller;