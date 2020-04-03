// Dummy Data

// import models
const db = require('./models/db.js');
var ObjectId = require('mongodb').ObjectID;

var async = require('async')
const Category  = require('./models/category.js');
const Client    = require('./models/client.js');
const File      = require('./models/file.js');
const Post      = require('./models/post.js');
const Report    = require('./models/report.js');
const Review    = require('./models/review.js');
const User      = require('./models/user.js');

// declaration of collections
const categoryCollection    = 'category';
const clientCollection      = 'client';
const fileCollection        = 'file';
const postCollection        = 'post';
const reportCollection      = 'report';
const reviewCollection      = 'review';
const userCollection        = 'users';

// calls the function createDatabase() defined in the `database` object in `./models/db.js`
//db.createDatabase();

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/bids", {useNewUrlParser: true});
var mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'MongoDB connection error'));

var categories = []
var users = []
var clients = []

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
                      isSuspended, likedPosts, avatar, cb)
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
        likedPosts: likedPosts,
        avatar: avatar
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

var posts = []

function postCreate(poster, title, description,
    startprice, currentprice, stealprice, incrementprice,
    highestbidder, paymentmode, details, categories,
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
        categories: categories,

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

function createUsers(cb) {
    async.series([
        function(callback) {
            userCreate('bidspp@gmail.com', 'p@ssword', false, callback);
        },
        function(callback) {
            userCreate('shargaw@dlsu.edu.ph', 'hatdog', true, callback);
        },
        function(callback) {
            userCreate('kristine@yahoo.com', 'luvunemo', true, callback);
        },
        function(callback) {
            userCreate('robijeanne@gmail.com', '921127', true, callback);
        },
        function(callback) {
            userCreate('nemo@puppers.com', 'henlo', true, callback);
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
            userCreate('merida_ofdunbroch@gmail.com', 'bebrave', true, callback);
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
            categoryCreate("Top", callback);
        },
        function(callback) {
            categoryCreate("Bottom", callback);
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
            clientCreate(users[1], 123, "sharmainegaw", "09959201000", "decluttering.", null, null, null, false, false, false, false, null, null, callback)
        },
        function(callback) {
            clientCreate(users[2], 123, "christinedtc", "09912345678", "for nemo <3", null, null, null, false, false, false, false, null, null, callback)
        },
        function(callback) {
            clientCreate(users[3], 123, "julibi", "09062583907", "Hello! I sell a lot of original KPOP merch.", "hawkeye1006", "robijeanne.banogon", null, true, true, false, false, null, null, callback)
        },
        function(callback) {
            clientCreate(users[4], 123, "nemumu", "09123456789", "I am an adorable little dog, who will bid for treats.", "nemumu", "nemumu", "nemumu", true, true, true, false, null, null, callback)
        },
        function(callback) {
            clientCreate(users[5], 123, "iammoana", "63167892453", "I am Moana of Motunui. You will board my boat, sail across the sea, and restore the heart of Te Fiti.", "iammoana", null, "iammoana", true, false, true, false, null, null, callback)
        },
        function(callback) {
            clientCreate(users[6], 123, "thelittlemermaid", "63265874695", "Look at this stuff, isn't it neat? Wouldn't you think my collection's complete? Wouldn't you think I'm the girl, the girl who has everything?", null, null, "thelittlemermaid", false, false, true, false, null, null, callback)
        },
        function(callback) {
            clientCreate(users[7], 123, "huamulan", "63178597562", "I will show the world what's inside my heart and be loved for who I am.", "huamulan", null, "huamulan", true, false, true, false, null, null, callback)
        },
        function(callback) {
            clientCreate(users[8], 123, "annaofarendelle", "63065482549", "I climbed the north mountain, survived a frozen heart, and save my sister from my ex-boyfriend.", "annaofarendelle", "annaofarendelle", null, true, true, false, false, null, null, callback)
        },
        function(callback) {
            clientCreate(users[9], 123, "daretobedifferent", "639152458214", "I want adventure in the great wide somewhere... I want so much more than they've got planned.", null, "littlebeauty", null, false, true, false, false, null, null, callback)
        },
        function(callback) {
            clientCreate(users[10], 123, "fairestoneofall", "63165874962", "Lips red as the rose, hair black as ebony, skin white as snow.", null, "fairestofall", "fairestofall", false, true, true, false, null, null, callback)
        },
        function(callback) {
            clientCreate(users[11], 123, "bravemerida", "63265874589", "I am Merida, and I'll be shooting for my own hand.", "bravemerida", "bravemerida", null, true, true, false, false, null, null, callback)
        },
        function(callback) {
            clientCreate(users[12], 123, "sugarrushqueen", "63154879863", "I'm not a glitch, I just have pixlexia", "sugarrushqueen", null, "sugarrushqueen", true, false, true, false, null, null, callback)
        },
        function(callback) {
            clientCreate(users[13], 123, "nameismatoaka", "63168954782", "If you walk the footsteps of a stranger, you'll learn things you never knew you never knew.", "nameismatoaka", "nameismatoaka", null, true, true, false, false, null, null, callback)
        },
        function(callback) {
            clientCreate(users[14], 123, "princessaurora", "63178954821", "Yes, it's only in my dreams. But they say if you dream a thing more than once, it's sure to come true, and I've dreamed that dream so many times.", "princessaurora", "princessaurora", "princessaurora", true, true, true, false, null, null, callback)
        },
    ], cb);
}

function createPosts(cb) {
    async.series([
        function(callback) {
            postCreate(clients[0], "post 1 test", "here is my post. hello home!",
                120, 150, 200, 10, clients[3], "Cash", "Goks", [categories[0], categories[1],],
                true, true, false, callback);
        },
        function(callback) {
            postCreate(clients[2], "post 2 test", "here is my second post. hello!!!",
                400, 420, 550, 20, clients[3], "GCash", "DLSU", [categories[2], categories[3],],
                true, false, false, callback);
        },
    ], cb);
}

function update(cb) {
    async.series([
        function(callback) {
            clients[0].likedPosts = [posts[1]]
            clients[0].save(callback)
        },
        // function(callback) {
        //     clients[1].likedPosts = [posts[0], posts[1]]
        //     clients[1].save(callback)
        // }
    ], cb);
}

async.series([
    createUsers,
    createCategories,
    createClients,
    createPosts,
    update
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
/*
var sample = new User({
    email: "waluigi@a.com",
    password: "weeee",
    isClient: true
});

db.insertOne(userCollection, sample);

//CLIENTS ///

db.findOne('users', {email: "waluigi"}, function(result) {

    var client = new Client
({
    user:               result,
    id_num:             11111111,
    username:           "waluigi",

    number:             123
});

db.insertOne(clientCollection, client);

})






// var review = new Review ({
//     review_id: 001,
//     num_stars: 4,
//     reviewer_email: 'christine@gmail.com',
//     revieweduser: 'nemumu',
//     review: 'great doggo. Would work with again.'

// });

// db.insertOne(reviewCollection, review);

// var post = {
    
//     poster:             'christinedtc',
//     name:               "HARRY POTTER AND THE PHILOSOPHER'S STONE",
//     description:        "Good as new. None of the pages are folded. Wrapped in plastic. RFS: Decluttering",
//     numFFs:             4,

//     start_price:        200,
//     current_price:      200,
//     steal_price:        300,
//     increment_price:    10,

//     highest_bidder:     'sharmainegaw',
//     cutoff_date:        03/02/2020,
//     cutoff_time:        "10:00:00PM",
//     payment_mode:       'Cash',
//     meetup_details:     'Around DLSU',
//     categories:         'Book', // indicate array?
//     post_date:          02/22/2020,
//     post_time:          "11:59:00PM",
//     // pictures:        {type: Schema.Types.ObjectId, ref: 'Files', required: true}, // indicate array?

//     isOpen:          true,
//     isApproved:      true,
//     isReviewed:      false,
    
// };

//  db.insertOne(postCollection, post);