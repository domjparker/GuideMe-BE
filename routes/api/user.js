const router = require("express").Router();
const userController = require("../../controllers/")

// matches with "/api/user"
router.route("/")
    .post(userController.create);

// matches with "/api/user/:id"
router.route("/:id")
    .get(UserController.findById)
    .put(UserController.update)
    .delete(UserController.remove);


module.exports = router;