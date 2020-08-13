const router = require("express").Router();
const messageController = require("../../controllers/messageController")

// matches with "/api/user"
router.route("/")
    .post(messageController.create);

// matches with "/api/user/:id"
router.route("/:id")
    .get(messageController.findByUser)
    .delete(messageController.remove);


module.exports = router;