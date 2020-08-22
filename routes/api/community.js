const router = require("express").Router();
const communityController = require("../../controllers/communityController");

// Matches with "/api/community"
router.route("/")
  .get(communityController.findAll)
  .post(communityController.create);

  module.exports = router;