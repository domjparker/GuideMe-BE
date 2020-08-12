const router = require("express").Router();
const userController = require("../../controllers/userController")

// matches with "/api/user"
router.route("/")
    .post(userController.create);

// matches with "/api/user/:id"
router.route("/:id")
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.remove);


module.exports = router;