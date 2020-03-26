// Dummy Data

// import module from `./models/db.js`
const db = require('./models/db.js');
const Client = require('./models/client.js')

// name of the collection (table) to perform CRUD (Create, Read, Update, Delete) operations
const clientCollection = 'client';
const postCollection = 'posts';

// calls the function createDatabase() defined in the `database` object in `./models/db.js`
db.createDatabase();

// creates an object containing first name, last name, username, and bio of a user
var client = new Client({
    email:              'nemo@puppers.com',
    id_num:             11646845,
    username:           'nemumu',

    number:             09123456789,
    bio:                'I am an adorable little dog, who will bid for treats.',
    twitter:            'nemumu',
    facebook:           'nemumu',
    // hasfb:              null,
    // hastw:              null,
    // hasig:              null,
    isSuspended:        false,
    // likedPosts:         {type: Schema.Types.ObjectId, ref: 'Posts'},
    // avatar:             'img\default.png',

});

// calls the function insertOne() defined in the `database` object in `./models/db.js`
// stores the object `user` in the collection (table) `profiles`
db.insertOne(clientCollection, client);

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


