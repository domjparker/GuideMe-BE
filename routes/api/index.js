const router = require("express").Router();
const adventureRoutes = require("./adventure");
const userRoutes = require("./user");

// Book routes
router.use("/adventure", adventureRoutes);
router.use("/user", userRoutes);

module.exports = router;
