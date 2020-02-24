const router = require("express").Router();
const adminRoutes = require("./manage");

// Book routes
router.use("/manage", adminRoutes);

module.exports = router;

//just added