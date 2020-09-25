const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true
      },
    adventureId:{
        type: Schema.Types.ObjectId,
        ref: "Adventure",
        required: true
    },
    hostId:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    rating:{
        type: String,
        required: true
    }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;