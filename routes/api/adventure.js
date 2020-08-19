const router = require("express").Router();
const adventureController = require("../../controllers/adventureController");

// Matches with "/api/adventure"
router.route("/")
  .get(adventureController.findAll)
  .post(adventureController.create);

// Matches with "/api/adventure/:id"
router
  .route("/:id")
  .get(adventureController.findById)
  .put(adventureController.update)
  .delete(adventureController.remove);

// Matches with "/api/adventure/location/:location"  
router
  .route("/location/:location")
  .get(adventureController.findLocation);

// Matches with "/api/adventure/tags/:tag"
router
  .route("/tags/:tag")
  .get(adventureController.findTag)
  
  // Matches with "/api/adventure/host/:id"
router
  .route("/host/:id")
  .get(adventureController.findByHostId)


module.exports = router;
