const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, match: [/.+@.+\..+/, "Please enter a valid e-mail address"], required: true },
  password: { type: String,  required: true },
  bio: {type:String},
  location:{type: String},
  veriifed:{type:Boolean, default: false},
  host: {type:Boolean, default: false},
  hostedAdventures: {type:Array},
  completedAdventures: {type:Array}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
