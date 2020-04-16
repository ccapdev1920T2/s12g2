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
    var user = new User({
            email:email,
            password:password,
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
            userCreate('iammoana@gmail.com', 'heartoftefiti', true, callback);
        },
        function(callback) {
            userCreate('princessariel@gmail.com', 'thingamabob', true, callback);
        },
        function(callback) {
            userCreate('mulan_hua@dlsu.edu.ph', 'reflection1998', true, callback);
        },
        function(callback) {
            userCreate('annaofarendelle@gmail.com', 'nextrightthing', true, callback);
        },
        function(callback) {
            userCreate('littlebeauty@gmail.com', 'andthebeast', true, callback);
        },
        function(callback) {
            userCreate('snowwhite@gmail.com', 'andthe7dwarfs', true, callback);
        },
        function(callback) {
            userCreate('merida_ofdunbroch@gmail.com', 'bebrave3', true, callback);
        },
        function(callback) {
            userCreate('vanellope_von_schweetz@dlsu.edu.ph', 'notaglitch', true, callback);
        },
        function(callback) {
            userCreate('the_pocahontas@gmail.com', 'colorsofthewind', true, callback);
        },
        function(callback) {
            userCreate('thesleepingbeauty@gmail.com', 'deepsleep', true, callback);
        },
        function(callback) {
            userCreate('princecharming@gmail.com', 'maybehenry', true, callback);
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
            clientCreate(users[1], 11827101, "sharmainegaw", "09959201000", "decluttering.", null, null, null, false, false, false, false, callback)
        },
        function(callback) {
            clientCreate(users[2], 11827101, "christinedtc", "09912345678", "for nemo <3", null, null, null, false, false, false, false, callback)
        },
        function(callback) {
            clientCreate(users[3], 11827101, "julibi", "09062583907", "Hello! I sell a lot of original KPOP merch.", "hawkeye1006", "robijeanne.banogon", null, true, true, false, false, callback)
        },
        function(callback) {
            clientCreate(users[4], 11827101, "nemumu", "09123456789", "I am an adorable little dog, who will bid for treats.", "nemumu", "nemumu", "nemumu", true, true, true, false, callback)
        },
        function(callback) {
            clientCreate(users[5], 11827101, "iammoana", "63167892453", "I am Moana of Motunui. You will board my boat, sail across the sea, and restore the heart of Te Fiti.", "iammoana", null, "iammoana", true, false, true, false, callback)
        },
        function(callback) {
            clientCreate(users[6], 11827101, "thelittlemermaid", "63265874695", "Look at this stuff, isn't it neat? Wouldn't you think my collection's complete? Wouldn't you think I'm the girl, the girl who has everything?", null, null, "thelittlemermaid", false, false, true, false, callback)
        },
        function(callback) {
            clientCreate(users[7], 11827101, "huamulan", "63178597562", "I will show the world what's inside my heart and be loved for who I am.", "huamulan", null, "huamulan", true, false, true, false, callback)
        },
        function(callback) {
            clientCreate(users[8], 11827101, "annaofarendelle", "63065482549", "I climbed the north mountain, survived a frozen heart, and save my sister from my ex-boyfriend.", "annaofarendelle", "annaofarendelle", null, true, true, false, false, callback)
        },
        function(callback) {
            clientCreate(users[9], 11827101, "daretobedifferent", "639152458214", "I want adventure in the great wide somewhere... I want so much more than they've got planned.", null, "littlebeauty", null, false, true, false, false, callback)
        },
        function(callback) {
            clientCreate(users[10], 11827101, "fairestoneofall", "63165874962", "Lips red as the rose, hair black as ebony, skin white as snow.", null, "fairestofall", "fairestofall", false, true, true, false, callback)
        },
        function(callback) {
            clientCreate(users[11], 11827101, "bravemerida", "63265874589", "I am Merida, and I'll be shooting for my own hand.", "bravemerida", "bravemerida", null, true, true, false, false, callback)
        },
        function(callback) {
            clientCreate(users[12], 11827101, "sugarrushqueen", "63154879863", "I'm not a glitch, I just have pixlexia", "sugarrushqueen", null, "sugarrushqueen", true, false, true, false, callback)
        },
        function(callback) {
            clientCreate(users[13], 11827101, "nameismatoaka", "63168954782", "If you walk the footsteps of a stranger, you'll learn things you never knew you never knew.", "nameismatoaka", "nameismatoaka", null, true, true, false, false, callback)
        },
        function(callback) {
            clientCreate(users[14], 11827101, "princessaurora", "63178954821", "Yes, it's only in my dreams. But they say if you dream a thing more than once, it's sure to come true, and I've dreamed that dream so many times.", "princessaurora", "princessaurora", "princessaurora", true, true, true, false, callback)
        },
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
            reportCreate(clients[1]._id, clients[10]._id, "flaking", "Never showed up and can't be contacted anymore.", false, callback);
        },
        function(callback) {
            reportCreate(clients[2]._id, clients[10]._id, "flaking", "We were supposed to meetup, but they never showed up and can't be contacted.", false, callback);
        },
        function(callback) {
            reportCreate(clients[3]._id, clients[13]._id, "spam", "Spammed my inbox with sketchy websites and ads.", false, callback);
        },
        function(callback) {
            reportCreate(clients[4]._id, clients[12]._id, "offensive", "Was extremely rude and did not care about customers.", false, callback);
        },
        function(callback) {
            reportCreate(clients[4]._id, clients[11]._id, "offensive", "Extremely rude and was not cooperative.", false, callback);
        }
    ], cb);
}

function createReviews(cb) {
    async.series([
        function(callback) {
            reviewCreate(5, clients[1]._id, clients[2]._id, "Easy to talk to and arrived on time.", callback);
        },
        function(callback) {
            reviewCreate(5, clients[2]._id, clients[3]._id, "Great items. Very responsive.", callback);
        },
        function(callback) {
            reviewCreate(4, clients[4]._id, clients[3]._id, "Came on time. Items were better than expected.", callback);
        },
        function(callback) {
            reviewCreate(4, clients[2]._id, clients[1]._id, "Great items! Would highly recommend seller.", callback);
        },
        function(callback) {
            reviewCreate(2, clients[1]._id, clients[4]._id, "Took to long to response and arrived late.", callback);
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