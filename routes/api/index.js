const router = require("express").Router();
const adventureRoutes = require("./adventure");
const userRoutes = require("./user");
const messageRoutes = require("./message");
const tagRoutes = require("./tag");

const { route } = require("./adventure");

//Routes
router.use("/adventure", adventureRoutes);
router.use("/user", userRoutes);
router.use("/message", messageRoutes);
router.use("/tag", tagRoutes);


module.exports = router;
