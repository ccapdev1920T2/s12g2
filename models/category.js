var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name:           {type: String, text: true},
});

//export model
module.exports = mongoose.model('Category', categorySchema);