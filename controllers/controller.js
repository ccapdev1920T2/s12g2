
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
            
            // var hasfb = (result.facebook != null);
            // var hasig = (result.instagram != null);
            // var hastw = (result.twitter != null);

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
            console.log(result.next());
            res.render('profile', result);

            
        })

    },

    /* LOADS LOG IN PAGE */
   /* getLogInPage : function() {
        res.render('home');
    } */
 
};

module.exports = controller;