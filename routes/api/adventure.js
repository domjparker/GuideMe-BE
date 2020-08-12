const router = require("express").Router();
const adventureController = require("../../controllers/adventureController");

// Matches with "/api/adventure"
router.route("/")
  .get(adventureController.findAll)
  .post(adventureController.create);

router
  .route("/:id")
  .get(adventureController.findById)
  .put(adventureController.update)
  .delete(adventureController.remove);
router
  .route("/location/:location")
  .get(adventureController.findLocation);

  
module.exports = router;
