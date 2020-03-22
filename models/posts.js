var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postsSchema = new Schema({
    //post_id:      {type: Number, required: true},
    poster:         {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    name:           {type: String, /*max: ,*/ required: true},
    description:    {type: String, /*max: ,*/ required: true},
    numFFs:         {type: Number, default: 0},

    start_price:     {type: Number, /*max: ,*/ required: true},
    current_price:   {type:  Number, /*max: ,*/ required: true},
    increment_price: {type: Number, /*max: ,*/ required: true},

    highest_bidder:  {type: Schema.Types.ObjectId, ref: 'Client', default: null},
    cutoff_date:     {type: Date, required: true},
    cutoff_time:     {type: Date, required: true},
    payment_mode:    {type: String, required: true, enum: ['GCash', 'Cash', 'PayMaya']},
    meetup_details:  {type: String, /*max: ,*/ required: true},
    categories:      {type: Schema.Types.ObjectId, ref: 'Categories', /*max: ,*/ required: true}, // indicate array?
    post_date:       {type: Date, default: Date.now},
    pictures:        {type: Schema.Types.ObjectId, ref: 'Files', required: true}, // indicate array?

    isOpen:          {type: Boolean, default: true},
    isApproved:      {type: Boolean, default: false},
    isReviewed:      {type: Boolean, default: false}

});

//export model
module.exports = mongoose.model('Posts', postsSchema);
