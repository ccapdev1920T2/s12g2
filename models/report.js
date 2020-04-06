var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reportSchema = new Schema({
    //report_id:          {type: Number, required: true},
    reporter:           {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    reporteduser:       {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    reason:             {type: String, required: true},
    complaint:          {type: String, /*max: ,*/ required: true},
    datesubmitted:      {type: Date, default: Date.now},
    isResolved:         {type: Boolean, default: false}
});

//export model
module.exports = mongoose.model('Report', reportSchema);