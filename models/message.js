const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    senderId:{
        type: Schema.Types.ObjectId,
        ref: "User"
      },
    recieverId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    messageText:{
        type: String,
        required: true
    },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;