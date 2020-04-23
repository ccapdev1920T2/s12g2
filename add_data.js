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
mongoose.connect(process.env.MONGODB_URI || "mongodb:localhost:27017/bids", {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
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
            clientCreate(users[1], 12200018, "sharmainegaw", "09959201000", "decluttering.", null, null, null, false, false, false, false, callback)
        },
        function(callback) {
            clientCreate(users[2], 12207918, "christinedtc", "09912345678", "for nemo <3", null, null, null, false, false, false, false, callback)
        },
        function(callback) {
            clientCreate(users[3], 12207993, "julibi", "09062583907", "Hello! I sell a lot of original KPOP merch.", "hawkeye1006", "robijeanne.banogon", null, true, true, false, false, callback)
        },
        function(callback) {
            clientCreate(users[4], 11640766, "nemumu", "09123456789", "I am an adorable little dog, who will bid for treats.", "nemumu", "nemumu", "nemumu", true, true, true, false, callback)
        },
        function(callback) {
            clientCreate(users[5], 11336498, "randomperson", "09112233445", "Why are you looking at my profile?", null, null, null, false, false, false, false, callback)
        }
    ], cb);
}


async.series([
    createUsers,
    createCategories,
    createClients,
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