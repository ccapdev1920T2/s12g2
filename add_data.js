// Dummy Data

// import models
// const db = require('./models/db.js');
// var ObjectId = require('mongodb').ObjectID;

var async = require('async')
const Category  = require('./models/category.js');
const Client    = require('./models/client.js');
const File      = require('./models/file.js');
const Post      = require('./models/post.js');
const Report    = require('./models/report.js');
const Review    = require('./models/review.js');
const User      = require('./models/user.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/bids", {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
var mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'MongoDB connection error'));

var categories = []
var users = []
var clients = []
var posts = []
var reports = []
var reviews = []



function userCreate(email, password, isClient, cb)
{
    bcrypt.hash(password, saltRounds, function(err, hash) {
        var user = new User({
            email:email,
            password:hash,
            isClient:isClient
        });

        user.save(function(err){
            if (err) {
                cb(err, null)
                return
            }
            console.log('New User: ' + user);
            users.push(user);
            cb(null, user);
        });
    });
}

function categoryCreate(name, cb)
{
    var category = new Category({name:name});

    category.save(function(err){
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Category: ' + category);
        categories.push(category);
        cb(null, category);
    });
}

function clientCreate(user, id_num, username, number,
                      bio, twitter, facebook, instagram, hasfb, hastw, hasig, 
                      isSuspended, cb)
{
    var client = new Client({
        user: user,
        id_num: id_num,
        username: username,
        number: number,
        bio: bio,
        twitter: twitter,
        facebook: facebook,
        instagram: instagram,
        hasfb: hasfb,
        hastw: hastw,
        hasig: hasig,
        isSuspended: isSuspended,
    });

    client.save(function(err){
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Client: ' + client);
        clients.push(client);
        cb(null, client);
    });
}

function postCreate(poster, title, description,
    startprice, currentprice, stealprice, incrementprice,
    highestbidder, paymentmode, details, category, picture,
    isOpen, isApproved, isReviewed, cb)
{
    var post = new Post({
        poster: poster,
        title: title,
        description: description,
        
        startprice: startprice,
        currentprice: currentprice,
        stealprice: stealprice,
        incrementprice: incrementprice,
        
        highestbidder: highestbidder,
        paymentmode: paymentmode,
        details: details,
        category: category,
        picture: picture,

        isOpen: isOpen,
        isApproved: isApproved,
        isReviewed: isReviewed
    })

    post.save(function(err){
        if (err) {
            cb(err, null)
            return
        }
        console.log("New Post: " + post);
        posts.push(post);
        cb(null, post);
    });
    
}

function reportCreate(reporter, reporteduser, reason, complaint, isResolved, cb)
{
    var report = new Report({
            reporter: reporter,
            reporteduser: reporteduser,
            reason: reason,
            complaint: complaint,
            isResolved: isResolved
        });

    report.save(function(err){
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Report: ' + report);
        reports.push(report);
        cb(null, report);
    });
}

function reviewCreate(num_stars, reviewer, revieweduser, review, cb)
{
    var review = new Review({
            num_stars: num_stars,
            reviewer: reviewer,
            revieweduser: revieweduser,
            review: review
        });

    review.save(function(err){
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Review: ' + review);
        reviews.push(review);
        cb(null, review);
    });
}

function createUsers(cb) {
    async.series([
        function(callback) {
            userCreate('bidspp@gmail.com', 'p@ssword', false, callback);
        },
        function(callback) {
            userCreate('shargaw@dlsu.edu.ph', 'hatdog123', true, callback);
        },
        function(callback) {
            userCreate('kristine@yahoo.com', 'luvunemo', true, callback);
        },
        function(callback) {
            userCreate('robijeanne@gmail.com', '921127abc', true, callback);
        },
        function(callback) {
            userCreate('nemo@puppers.com', 'henloworld', true, callback);
        },
        function(callback) {
            userCreate('random@random.com', 'qwerty12345', true, callback);
        }
    ], cb);
}

function createCategories(cb) {
    async.series([
        function(callback) {
            categoryCreate("Book", callback);
        },
        function(callback) {
            categoryCreate("For Pet", callback);
        },
        function(callback) {
            categoryCreate("Women's", callback);
        },
        function(callback) {
            categoryCreate("Men's", callback);
        },
        function(callback) {
            categoryCreate("Children's", callback);
        },
        function(callback) {
            categoryCreate("Shoes", callback);
        },
        function(callback) {
            categoryCreate("Stationery", callback);
        },
        function(callback) {
            categoryCreate("Food", callback);
        },
        function(callback) {
            categoryCreate("Collectible", callback);
        },
        function(callback) {
            categoryCreate("Accessory", callback);
        },
        function(callback) {
            categoryCreate("Technology", callback);
        }
    ], cb);
}

function createClients(cb) {
    async.series([
        function(callback) {
            clientCreate(users[1], 11827101, "sharmainegaw", "09959201000", "decluttering.", 4.2, 5, null, null, null, false, false, false, false, callback)
        },
        function(callback) {
            clientCreate(users[2], 11827101, "christinedtc", "09912345678", "for nemo <3", 4.4, 5, null, null, null, false, false, false, false, callback)
        },
        function(callback) {
            clientCreate(users[3], 11827101, "julibi", "09062583907", "Hello! I sell a lot of original KPOP merch.", 4.4, 5, "hawkeye1006", "robijeanne.banogon", null, true, true, false, false, callback)
        },
        function(callback) {
            clientCreate(users[4], 11827101, "nemumu", "09123456789", "I am an adorable little dog, who will bid for treats.", 4.6, 5, "nemumu", "nemumu", "nemumu", true, true, true, false, callback)
        },
        function(callback) {
            clientCreate(users[5], 11827101, "randomperson", "09112233445", "Why are you looking at my profile?", null, null, null, false, false, false, false, callback)
        }
    ], cb);
}

function createPosts(cb) {
    async.series([
        function(callback) {
            postCreate(clients[0]._id, "OFF-WHITE CROPPED TOP", "stain sa front. cute for summer",
                '120', '150', '200', '10', clients[3], "Cash", "Goks", categories[2], '/img/item_shar.jpg',
                true, false, false, callback);
        },
        function(callback) {
            postCreate(clients[1]._id, "HARRY POTTER AND THE PHILOSOPHER'S STONE", "Good as new. None of the pages are folded. Wrapped in plastic. RFS: Decluttering",
                '200', '210', '300', '10', clients[3], "Cash", "Around DLSU", categories[0], '/img/item_christine.jpg',
                true, false, false, callback);
        },
        function(callback) {
            postCreate(clients[2]._id, "K-POP TWICE LIGHTSTICK VERSION 2 CANDY BONG", 
            "WTS/LFB 100% Unopened and Official. \nInclusions: Free TWICE Photocards\nRFS: I need money for WJSN concert :-(",
               '2100', '2300', '2300', '50', clients[3], "GCash", "Andrew Lobby", categories[8], '/img/item_robi1.jpg',
                false, false, false, callback);
        },
        function(callback) {
            postCreate(clients[2]._id, "EXO GROWL XOXO REPACKAGE ALBUM KISS VER", 
            "WTS/LFB 100% Sealed and Official\nEXO GROWL (XOXO Repackage Album) Kiss Version\n\nIncludes all official 12 photocards and poster",
                '600', '620', '750', '10', clients[3], "GCash", "Bloemen", categories[8], '/img/item_robi.jpg',
                true, false, false, callback);
        },
        function(callback) {
            postCreate(clients[3]._id, "PEDIGREE TERIYAKI FLAVOR DOG TREATS", 
            "Sealed treats! If this is not sold, I get to eat it!\nRFS: My owner wants me to :(",
                '300', '300', '500', '20', null, "GCash", "Bloemen", categories[1], '/img/item_nemo.jpg',
                true, false, false, callback);
        },
    ], cb);
}

function createReports(cb) {
    async.series([
        function(callback) {
            reportCreate(clients[0]._id, clients[4]._id, "flaking", "Never showed up and can't be contacted anymore.", false, callback);
        },
        function(callback) {
            reportCreate(clients[1]._id, clients[4]._id, "flaking", "We were supposed to meetup, but they never showed up and can't be contacted.", false, callback);
        },
        function(callback) {
            reportCreate(clients[2]._id, clients[4]._id, "spam", "Spammed my inbox with sketchy websites and ads.", false, callback);
        },
        function(callback) {
            reportCreate(clients[3]._id, clients[4]._id, "offensive", "Was extremely rude and did not care about customers.", false, callback);
        },
        function(callback) {
            reportCreate(clients[0]._id, clients[4]._id, "offensive", "Extremely rude and was not cooperative.", false, callback);
        },

        function(callback) {
            reportCreate(clients[1]._id, clients[4]._id, "flaking", "Did not show up for our meetup.", false, callback);
        },
        function(callback) {
            reportCreate(clients[2]._id, clients[4]._id, "flaking", "We were going to meetup but I can't contact them.", false, callback);
        },
        function(callback) {
            reportCreate(clients[3]._id, clients[4]._id, "spam", "Spammed my inbox with ads.", false, callback);
        },
        function(callback) {
            reportCreate(clients[0]._id, clients[4]._id, "offensive", "Started insulting me when I requested a later date for a meetup.", false, callback);
        },
        function(callback) {
            reportCreate(clients[1]._id, clients[4]._id, "offensive", "Used insulting words, when I said the time wasn't possible for me.", false, callback);
        },

        function(callback) {
            reportCreate(clients[2]._id, clients[4]._id, "flaking", "Didn't show up.", false, callback);
        },
        function(callback) {
            reportCreate(clients[3]._id, clients[4]._id, "flaking", "Did not even show up for our meetup.", false, callback);
        },
        function(callback) {
            reportCreate(clients[0]._id, clients[4]._id, "spam", "Spammed my inbox and left 1000 irrelevant messages.", false, callback);
        },
        function(callback) {
            reportCreate(clients[1]._id, clients[4]._id, "offensive", "Uses vulgar words.", false, callback);
        },
        function(callback) {
            reportCreate(clients[2]._id, clients[4]._id, "offensive", "Insulted me when I refused his other products.", false, callback);
        },

        function(callback) {
            reportCreate(clients[3]._id, clients[4]._id, "flaking", "Did not show up for our meetup. I waited for 2 hours.", false, callback);
        },
        function(callback) {
            reportCreate(clients[0]._id, clients[4]._id, "flaking", "An hour before our meetup I couldn't contact him anymore.", false, callback);
        },
        function(callback) {
            reportCreate(clients[1]._id, clients[4]._id, "spam", "Spammed my inbox with ads.", false, callback);
        },
        function(callback) {
            reportCreate(clients[2]._id, clients[4]._id, "offensive", "Very rude when I said I only wanted the product I bidded on.", false, callback);
        },
        function(callback) {
            reportCreate(clients[3]._id, clients[4]._id, "offensive", "Rude and uncooperative.", false, callback);
        }

    ], cb);
}

function createReviews(cb) {
    async.series([
        // Reviews for sharmainegaw (4.2/5)
        function(callback) {
            reviewCreate(5, clients[1]._id, clients[0]._id, "Easy to talk to and arrived on time.", callback);
        },
        function(callback) {
            reviewCreate(5, clients[2]._id, clients[0]._id, "Great items. Very responsive.", callback);
        },
        function(callback) {
            reviewCreate(4, clients[3]._id, clients[0]._id, "Came on time. Items were better than expected.", callback);
        },
        function(callback) {
            reviewCreate(3, clients[2]._id, clients[0]._id, "Took quite long to respond, but items were in great condition.", callback);
        },
        function(callback) {
            reviewCreate(4, clients[3]._id, clients[0]._id, "I am very pleased with the items that I got.", callback);
        },

        // Reviews for christinedtc (4.4/5)
        function(callback) {
            reviewCreate(5, clients[0]._id, clients[1]._id, "Items were in good condition and arrived on time. Very easy to talk to.", callback);
        },
        function(callback) {
            reviewCreate(5, clients[2]._id, clients[1]._id, "Very responsive. Items in great condition.", callback);
        },
        function(callback) {
            reviewCreate(5, clients[3]._id, clients[1]._id, "I love my owner. <3", callback);
        },
        function(callback) {
            reviewCreate(3, clients[2]._id, clients[1]._id, "Accidentally brought the wrong item. It's fine though, but had to wait for her to get the right one.", callback);
        },
        function(callback) {
            reviewCreate(4, clients[0]._id, clients[1]._id, "I am very pleased with the items.", callback);
        },

        // Reviews for julibi (4.4/5)
        function(callback) {
            reviewCreate(5, clients[0]._id, clients[2]._id, "Responsive and easy to talk to.", callback);
        },
        function(callback) {
            reviewCreate(5, clients[1]._id, clients[2]._id, "Very responsive. Items were better than expected", callback);
        },
        function(callback) {
            reviewCreate(5, clients[3]._id, clients[2]._id, "Items were delicious.", callback);
        },
        function(callback) {
            reviewCreate(4, clients[1]._id, clients[2]._id, "Very kind seller. Would definitely buy from again.", callback);
        },
        function(callback) {
            reviewCreate(3, clients[0]._id, clients[2]._id, "Items were good. Seller took too long to respond.", callback);
        },

        // Reviews for nemumu (4.6/5)
        function(callback) {
            reviewCreate(5, clients[0]._id, clients[3]._id, "Items were great! Seller sometimes barks, but it's ok.", callback);
        },
        function(callback) {
            reviewCreate(5, clients[2]._id, clients[3]._id, "Loved the items. Would purchase from again.", callback);
        },
        function(callback) {
            reviewCreate(5, clients[1]._id, clients[3]._id, "Great dog. Items are a bit chewed up, but it's ok.", callback);
        },
        function(callback) {
            reviewCreate(4, clients[2]._id, clients[3]._id, "Accidentally brought the wrong item, but it's okay, because she's kind.", callback);
        },
        function(callback) {
            reviewCreate(4, clients[0]._id, clients[3]._id, "Great items and nice seller!", callback);
        }

        
    ], cb);
}

async.series([
    createUsers,
    createCategories,
    createClients,
    createPosts,
    createReports,
    createReviews
],

function(err, results)
{
    if(err)
    {
        console.log('ERROR: ' + err);
    }
    else
    {
        console.log('Finished creating DB.')
    }
    mongoose.connection.close();
});