var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    num_stars:          {type: Number, min: 0, max: 5, required: true},
    reviewer:           {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    revieweduser:       {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    review:             {type: String, /*max: ,*/ required: true},
    datesubmitted:      {type: Date, default: Date.now}
});

//export model
module.exports = mongoose.model('Review', reviewSchema);