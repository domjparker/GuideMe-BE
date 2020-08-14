const router = require("express").Router();
const userController = require("../../controllers/userController")

// matches with "/api/user/signup"
router.route("/signup")
    .post(userController.signup);

// matches with "/api/user/login"
router.route("/login")
    .post(userController.login);

router.route("/logout")
    .post(userController.logout);

// matches with "/api/user/:id"
router.route("/profile")
    .get(userController.findBySessionId)
    .put(userController.update)
    .delete(userController.remove);

module.exports = router;