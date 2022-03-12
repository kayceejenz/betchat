const router = require("express").Router();
const FeedCtrl = require("./../controllers/feed.controller");
const auth = require('./../middlewares/auth.middleware');
const { role } = require("./../config")

router.post("/", auth(role.USER), FeedCtrl.create);
router.get("/", auth(role.USER), FeedCtrl.getAll);
router.get("/:id", auth(role.USER), FeedCtrl.getOne);
router.put("/:id", auth(role.USER), FeedCtrl.update);
router.delete("/:id", auth(role.USER), FeedCtrl.delete);


module.exports = router