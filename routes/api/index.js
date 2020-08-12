const router = require("express").Router();
const adventureRoutes = require("./adventure");

// Book routes
router.use("/adventure", adventureRoutes);

module.exports = router;
