const router = require("express").Router();
const adventureRoutes = require("./adventure");
const userRoutes = require("./user");
const messageRoutes = require("./message");

//Routes
router.use("/adventure", adventureRoutes);
router.use("/user", userRoutes);
router.use("/message", messageRoutes);

module.exports = router;
