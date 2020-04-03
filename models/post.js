var mongoose = require('mongoose');
const Client = require('./client.js');

var Schema = mongoose.Schema;

var postSchema = new Schema({
    poster:         {type: Schema.Types.ObjectId, ref: Client, required: true},
    title:          {type: String, /*max: ,*/ required: true},
    // description:    {type: String, /*max: ,*/ required: true},
    // numFFs:         {type: Number, default: 0},

    // start_price:     {type: Number, /*max: ,*/ required: true},
    currentprice:   {type:  Number, /*max: ,*/ required: true},
    stealprice:     {type: Number, /*max: ,*/ required: true},
    //increment_price: {type: Number, /*max: ,*/ required: true},

    // highest_bidder:  {type: Schema.Types.ObjectId, ref: 'Client', default: null},
    date:           {type: Date, default: Date.now(), required: true},
    time:           {type: Date, default: Date.now(), required: true},
    // payment_mode:    {type: String, required: true, enum: ['GCash', 'Cash', 'PayMaya']},
    // meetup_details:  {type: String, /*max: ,*/ required: true},
    // categories:      {type: Schema.Types.ObjectId, ref: 'Categories', /*max: ,*/ required: true}, // indicate array?
    // post_date:       {type: Date, default: Date.now},
    // pictures:        {type: Schema.Types.ObjectId, ref: 'Files', required: true}, // indicate array?

    // isOpen:          {type: Boolean, default: true},
    // isApproved:      {type: Boolean, default: false},
    // isReviewed:      {type: Boolean, default: false}

});

//export model
module.exports = mongoose.model('Post', postSchema);
