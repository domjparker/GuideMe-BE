const router = require("express").Router();
const userController = require("../../controllers/userController");
const { route } = require("./adventure");

// matches with "/api/user/signup"
router.route("/signup")
    .post(userController.signup);

// matches with "/api/user/login"
router.route("/login")
    .post(userController.login);

// matches with "/api/user/logout"
router.route("/logout")
    .post(userController.logout);

// matches with "/api/user/profile"
router.route("/profile/")
    .get(userController.findBySessionId)
    .put(userController.update)
    .delete(userController.remove);
// matches with "/api/usernod/profile"
router.route("/profile/:id")
    .get(userController.findUserById)

// matches with "/api/user/profile/picture"
router.route("/profile/picture")
    .put(userController.updatePicture)

// matches with "/api/user/profile/banner"
router.route("/profile/banner")
    .put(userController.updateBanner)

// matches with "/api/user/getSession"
router.route("/getSession")
    .get(userController.getSession);

// matches with "/api/user/mailbox"
router.route("/mailbox")
    .get(userController.getMailbox)
    .put(userController.updateMailbox)
// matches with "/api/user/availability"
router.route("/availability")
    .get(userController.getAvailability)
    .put(userController.updateAvailability)
// matches with "/api/user/availability/booking"
router.route("/availability/booking")
    .put(userController.updateAvailabilityBooking)
// matches with "/api/user/availability/:id"
router.route("/availability/:id")
    .get(userController.getHostAvailability)

//matches with"/api/user/emailsender"
router.route("/emailsender")
.post(userController.nodemailerMailBox)

module.exports = router;