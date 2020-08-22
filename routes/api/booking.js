const router = require("express").Router();
const bookingController = require("../../controllers/bookingController");

// Matches with "/api/booking"
router.route("/")
.post(bookingController.create);
// Matches with "/api/booking/adventure/:id"
router.route("adventure/:id")
.get(bookingController.getBookingByAdventure)

module.exports = router;
