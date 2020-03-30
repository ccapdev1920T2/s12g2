// Dummy Data

// import models
const db = require('./models/db.js');

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
const userCollection        = 'user';

// calls the function createDatabase() defined in the `database` object in `./models/db.js`
db.createDatabase();

/// USERS ///

var user = new User
({
    email:      'nemo@puppers.com',
    password:   'henlo',
    isClient:   true
});

/// CLIENTS ///

var client = new Client
({
    // email:              'nemo@puppers.com',
    id_num:             11646845,
    username:           'nemumu',

    number:             "09123456789",
    bio:                'I am an adorable little dog, who will bid for treats.',
    twitter:            'nemumu',
    facebook:           'nemumu',
    isSuspended:        false,
});

db.insertOne(clientCollection, client);

var review = new Review ({
    review_id: 001,
    num_stars: 4,
    reviewer_email: 'christine@gmail.com',
    revieweduser: 'nemumu',
    review: 'great doggo. Would work with again.'

});

db.insertOne(reviewCollection, review);

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


