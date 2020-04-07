var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name:           {type: String},
});

//export model
module.exports = mongoose.model('Category', categorySchema);