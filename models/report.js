var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reportSchema = new Schema({
    report_id:          {type: Number, required: true},
    reporter_email:     {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    reporteduser_email: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    complaint:          {type: String, /*max: ,*/ required: true}
});s

//export model
module.exports = mongoose.model('Review', userSchema);