var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var fileSchema = new Schema({
    //file_id:      {type: Number, required: true},
    filename:       {type: String, /*max: ,*/ required: true},
    filetype:       {type: String, required: true, enum: ['jpg', 'jpeg', 'png']}

});

//export model
module.exports = mongoose.model('File', fileSchema);
