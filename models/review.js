const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
      },
    adventureId:{
        type: Schema.Types.ObjectId,
        ref: "Adventure"
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;