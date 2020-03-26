const db = require('.../models/db.js');

const controller = {

    /* LOADS A USER'S PROFILE */
    getProfile: function(req, res) {
        var name = req.params.username;

        var query = {username : name};

        db.findOne('client', query, function(res) {

            var hasfb = (res.facebook != null);
            var hasig = (res.instagram != null);
            var hastw = (res.twitter != null);

            res.render('profile', {
                ua = res.avatar /*temp*/,
                dp = res.avatar,
                profileusername = res.username,
                checkedstars = res.rating /*temp*/,
                uncheckedstars = 5 - res.rating,
                bio = res.bio,
                hasfb = this.hasfb,
                fb = res.facebook,
                hastwitter = this.hastw,
                tw = res.twitter,
                hasig = this.hasig,
                ig = res.instagram,
                contactdetails = res.number,
                post = /*not sure pa */res
            
            })
        })

    },

    /* LOADS LOG IN PAGE */
    getLogInPage : function() {
        res.render('home');
    }
};