var mongoose = require('mongoose');
const Client = require('./client.js');
const Categories = require('./category.js');

var Schema = mongoose.Schema;

var postSchema = new Schema({
    poster:         {type: Schema.Types.ObjectId, ref: Client, required: true},
    title:          {type: String, /*max: ,*/ required: true, text: true},
    description:    {type: String, /*max: ,*/ required: true, text: true},
    // numFFs:         {type: Number, default: 0},

    startprice:     {type: Number, /*max: ,*/ required: true},
    currentprice:   {type:  Number, /*max: ,*/ required: true},
    stealprice:     {type: Number, /*max: ,*/ required: true},
    incrementprice: {type: Number, /*max: ,*/ required: true},

    highestbidder:  {type: Schema.Types.ObjectId, ref: Client, default: null},
    paymentmode:    {type: String, required: true, enum: ['GCash', 'Cash', 'Bank Transfer', 'Paymaya']},
    cutoff:         {type: Date, default: Date.now, required: true},
    details:        {type: String, /*max: ,*/ required: true},
    category:       {type: Schema.Types.ObjectId, ref: Categories, /*max: ,*/ required: true},
    postdate:       {type: Date, default: Date.now},
    //pictures:        {type: Schema.Types.ObjectId, ref: 'Files', required: true}, // indicate array?
    picture:        [{type: String, default: "/img/default.png"}],
    isOpen:         {type: Boolean, default: true},
    isApproved:     {type: Boolean, default: false},
    isReviewed:     {type: Boolean, default: false},
},
{
    toObject: {virtuals: true,}
}
);

//export model
module.exports = mongoose.model('Post', postSchema);
