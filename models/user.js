const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, match: [/.+@.+\..+/, "Please enter a valid e-mail address"], required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  location: { type: String },
  verified: { type: Boolean, default: false },
  host: { type: Boolean, default: false },
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
  // url for cloudinary
  profilePictureUrl: { type: String },
  bannerPictureUrl: { type: String },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  ],
  mailbox: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true
    }  
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
