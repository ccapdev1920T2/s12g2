var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categSchema = new Schema({
    name:           {type: String, enum: ["Book", "For Pet", "Women's", "Top", "Bottom", "Men's", "Stationery", 
                                        "Food", "Collectible", "Children's", "Shoes", "Accesory", "Technology"]},
});

//export model
module.exports = mongoose.model('Categories', categSchema);