const db = require("../models")

module.exports = {
    getBookingbyAdventure: function(req,res) {
        db.Booking
        .find({adventureId:req.body.id})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req,res) {
        db.Booking
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
 
};