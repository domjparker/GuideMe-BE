const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, match: [/.+@.+\..+/, "Please enter a valid e-mail address"], required: true },
  password: { type: String,  required: true },
  bio: {type:String},
  location:{type: String},
  verified:{type:Boolean, default: false},
  host: {type:Boolean, default: false},
  hostedAdventures: [
    {
        type: Schema.Types.ObjectId,
        ref: "Adventure"
    }
],
  completedAdventures: [
    {
        type: Schema.Types.ObjectId,
        ref: "Adventure"
    }
],
  profilePicture: { data: Buffer, contentType: String },
  bannerPicture: { data: Buffer, contentType: String },
  tags:[
    {
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }
]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
