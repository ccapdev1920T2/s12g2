const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/bids", {useNewUrlParser: true});
var mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'MongoDB connection error'));

const Post = require('../models/post')

const temp = {

    getPosts: function(callback) {
        Post.find({}).populate('poster').exec(function(err, results) {
            if (err) throw err;
            callback(results)
        })
    },
}

module.exports = temp;