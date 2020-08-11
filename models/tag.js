const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tagName:{
        type:String
    }
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;