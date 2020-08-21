const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    guestId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
      },
    adventureId:{
        type: Schema.Types.ObjectId,
        ref: "Adventure",
        required:true
    },
    guestNumber:{type:Number, required:true},
    startTime:{type:Date, required:true},
    completionStatus:{type:Boolean, default:false},
    transacitonId:{type:number}
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;