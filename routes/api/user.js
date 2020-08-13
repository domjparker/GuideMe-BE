const router = require("express").Router();
const userController = require("../../controllers/userController")

// matches with "/api/user/signup"
router.route("/signup")
    .post(userController.signup);

// matches with "/api/user/login"
router.route("/login")
    .post(userController.login);

// matches with "/api/user/:id"
router.route("/:id")
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.remove);




module.exports = router;