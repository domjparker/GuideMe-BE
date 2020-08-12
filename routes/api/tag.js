const router = require("express").Router();
const tagController = require("../../controllers/tagController")

// matches with "/api/user"
router.route("/")
    .post(tagController.create);

// matches with "/api/tag/:id"
router.route("/:id")
    .get(tagController.findById)
    .put(tagController.update)
    .delete(tagController.remove);


module.exports = router;