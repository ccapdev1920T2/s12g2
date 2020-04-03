var mongoose = require('mongoose');
const Client = require('./client.js');

var Schema = mongoose.Schema;

var postSchema = new Schema({
    poster:         {type: Schema.Types.ObjectId, ref: Client, required: true},
    title:          {type: String, /*max: ,*/ required: true},
    description:    {type: String, /*max: ,*/ required: true},
    // numFFs:         {type: Number, default: 0},

    startprice:     {type: Number, /*max: ,*/ required: true},
    currentprice:   {type:  Number, /*max: ,*/ required: true},
    stealprice:     {type: Number, /*max: ,*/ required: true},
    incrementprice: {type: Number, /*max: ,*/ required: true},

    highestbidder:  {type: Schema.Types.ObjectId, ref: Client, default: null},
    paymentmode:    {type: String, required: true, enum: ['GCash', 'Cash', 'PayMaya']},
    cutoff:         {type: Date, default: Date.now, required: true},
    details:        {type: String, /*max: ,*/ required: true},
    categories:     [{type: Schema.Types.ObjectId, ref: 'Categories', /*max: ,*/ required: true}], // indicate array?
    postdate:       {type: Date, default: Date.now},
    // pictures:        {type: Schema.Types.ObjectId, ref: 'Files', required: true}, // indicate array?

    isOpen:         {type: Boolean, default: true},
    isApproved:     {type: Boolean, default: false},
    isReviewed:     {type: Boolean, default: false},
});

//export model
module.exports = mongoose.model('Post', postSchema);
