const router = require("express").Router();
const adventureRoutes = require("./adventure");
const userRoutes = require("./user");
const messageRoutes = require("./message");
const tagRoutes = require("./tag");
const communityRoutes = require("./community");
const bookingRoutes = require("./booking");
const reviewRoutes = require("./review");

// const { route } = require("./adventure");

//Routes
router.use("/adventure", adventureRoutes);
router.use("/user", userRoutes);
router.use("/message", messageRoutes);
router.use("/tag", tagRoutes);
<<<<<<< HEAD
router.use("/booking", bookingRoutes);
router.use("/review", reviewRoutes);
=======
router.use("/community", communityRoutes);

router.use("/booking", bookingRoutes)
>>>>>>> Dev


module.exports = router;
