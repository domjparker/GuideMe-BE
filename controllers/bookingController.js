const db = require("../models")

module.exports = {
    getBookingByAdventure: function(req,res) {
        db.Booking
        .find({adventureId:req.params.id})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req,res) {
        console.log(req.body)
        db.Booking
        .create({
           guestId: req.session.user.id,
           adventureId: req.body.id,
           startTime: req.body.startTime,
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
 
};