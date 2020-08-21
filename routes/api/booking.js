const router = require("express").Router();
const bookingController = require("../../controllers/bookingController");

// BOOKING ROUTE
router.route("/")
.get(bookingController.getBookingByAdventure)
.post(bookingController.create);


module.exports = router;
