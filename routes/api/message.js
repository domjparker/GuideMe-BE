const router = require("express").Router();
const messageController = require("../../controllers/messageController")

// matches with "/api/message"
router.route("/")
    .post(messageController.create);

// matches with "/api/message/:id"
router.route("/:id")
    .get(messageController.findSentMessage)
    .delete(messageController.remove);


module.exports = router;