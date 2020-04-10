var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var clientSchema = new Schema({
    user:               {type: Schema.Types.ObjectId, ref: 'User'/*, required: true*/},
    id_num:             {type: Number, maxLength: 8, required: true},
    username:           {type: String,/* maxLength: ,*/ unique: true, required: true, text: true},

    number:             {type: String, maxLength: 11, required: true},
    bio:                {type: String/*, maxLength: */},
    twitter:            {type: String},
    facebook:           {type: String},
    instagram:          {type: String},
    hasfb:              Boolean,
    hastw:              Boolean,
    hasig:              Boolean,
    isSuspended:        {type: Boolean, default: false},
    likedPosts:         [{type: Schema.Types.ObjectId, ref: 'Posts'}],
    avatar:             {type: String, default: "/img/default.png"}
});

//export model
module.exports = mongoose.model('Client', clientSchema);