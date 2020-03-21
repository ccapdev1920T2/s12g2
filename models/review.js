var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    review_id:          {type: Number, required: true},
    num_stars:          {type: Number, min: 0, max: 5, required: true},
    reviewer_email:     {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    revieweduser_email: {type: Schema.Tupes.ObjectId, ref: 'Client', required: true},
    review:             {type: String, /*max: ,*/ required: true}
});

//export model
module.exports = mongoose.model('Review', userSchema);