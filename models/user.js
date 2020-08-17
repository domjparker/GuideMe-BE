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
  // for cloudinary
  profilePictureUrl: { type: String },
  profileBannerUrl: { type: String},
  
  tags:[
    {
      converser: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      lastChange: { type: Date, default: Date.now },
      
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
