const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/users", require("./user.route"));
router.use("/feeds", require("./feed.route"));

module.exports = router