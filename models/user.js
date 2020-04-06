var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:      {type: String, required: true},
    password:   {type: String, required: true},
    isClient:   {type: Boolean, required: true}
});

//export model
module.exports = mongoose.model('User', userSchema);