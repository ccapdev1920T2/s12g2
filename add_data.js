// Dummy Data

// import models
const db = require('./models/db.js');

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

function createUsers(cb) {
    async.series([
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
            userCreate('bidspp@gmail.com', 'p@ssword', false, callback);
        },
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
        },,
        function(callback) {
            categoryCreate("Men's", callback);
        },,
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

async.series([
    createUsers,
    createCategories
],
function(err, results)
{
    if(err)
    {
        console.log('ERROR: ' + err);
    }
    else
    {
        console.log('Finished creating DB. YAY')
    }
    mongoose.connection.close();
});

var sample = new User({
    email: "waluigi",
    password: "weeee",
    isClient: true
});

db.insertOne(userCollection, sample);

/// CLIENTS ///

// var client = new Client
// ({
//     email:              'nemo@puppers.com',
//     id_num:             11646845,
//     username:           'nemumu',

//     number:             "09123456789",
//     bio:                'I am an adorable little dog, who will bid for treats.',
//     twitter:            'nemumu',
//     facebook:           'nemumu',
//     isSuspended:        false,
// });

// db.insertOne(clientCollection, client);

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