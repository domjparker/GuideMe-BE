const router = require("express").Router();
const tagController = require("../../controllers/tagController")

// matches with "/api/tag"
router.route("/")
    .get(tagController.getAllTags)
    .post(tagController.create);

// matches with "/api/tag/:id"
router.route("/:id")
    .get(tagController.findById)
    .delete(tagController.remove);


module.exports = router;