const router = require("express").Router();
const bookingController = require("../../controllers/bookingControllers");

// BOOKING ROUTE
router.route("/")
.get(bookingController.getBookingAdventure)
.post(bookingController.create);


module.exports = router;
