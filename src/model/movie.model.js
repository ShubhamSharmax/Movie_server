const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    moviename:{type:String, required:true},
    category:{type:String, required:true},
    actor:{type:mongoose.Schema.Types.ObjectId, ref:"users"}
})

const movie = mongoose.model("movie", movieSchema);

module.exports = movie; 