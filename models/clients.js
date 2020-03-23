var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var clientSchema = new Schema({
    email:              {type: Schema.Types.ObjectId, ref: 'User', required: true},
    id_num:             {type: Number, required: true},
    username:           {type: String, required: true},

    number:             {type: Number, required: true},
    bio:                {type: String, required: true},
    twitter:            {type: String},
    facebook:           {type: String},
    instagram:          {type: String},
    suspended:          {type: Boolean, default: false},
    likedPosts:         {type: Schema.Types.ObjectId, ref: 'Posts'},
    avatar:             {type: Schema.Types.ObjectId, ref: 'Files'},

    url:                {type: String},

});

//export model
module.exports = mongoose.model('Client', clientSchema);