const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    senderId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
      },
    recieverId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    messageText:{
        type: String,
        required: true,
        required:true
    },
});

const Messages = mongoose.model("Message", messageSchema);

module.exports = Messages;