const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema({
    targetId:{
        type: Schema.Types.ObjectId,
        ref: "User"
      },
    action:{
        type: String
    },
    adventureId:{
        type: Schema.Types.ObjectId,
        ref: "Adventure"
    },
    postImageUrl: {
        type: String
    },
    // newReview:{
    //     type: Schema.Types.ObjectId,
    //     ref: "review"
    // },
    postText: {
        type: String
    },
    createdAt: {
         type: Date, default: Date.now 
    }
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;