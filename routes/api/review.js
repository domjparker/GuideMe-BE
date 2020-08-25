const router = require("express").Router();
const reviewController = require("../../controllers/reviewController")

// matches with "/api/review"
router.route("/")
    .post(reviewController.create);

// matches with "/api/review/:id"
router.route("/:id")
    .get(reviewController.findReview)
    .delete(reviewController.remove);


module.exports = router;