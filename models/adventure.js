const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adventureSchema = new Schema({
    adventureName: {
        type: String,
        required: true
    },
    hostId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    stateLocation: {
        type: String,
        required: true
    },
    itinerary: {
        type: String,
        required: true
    },
    duration: {
        time:{type: Number, required:true},
        unit:{type: String, required:true}    
    },
    difficulty: {
        type: String,
        required: true
    },
    minGroupSize: {
        type: Number,
        required: true
    },
    maxGroupSize: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    gearList: {
        type: String
    },
    adventureImageUrl: {
        type: String
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tag"
        }
    ]
});

const Adventure = mongoose.model("Adventure", adventureSchema);

module.exports = Adventure;