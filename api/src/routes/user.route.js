const router = require("express").Router();
const UserCtrl = require("./../controllers/user.controller");
const auth = require('./../middlewares/auth.middleware');
const upload = require("./../middlewares/multer.middleware")
const { role } = require("./../config")

router.get("/",  UserCtrl.getAll);
router.get("/:userId",  UserCtrl.getOne);
router.put("/:userId", upload("image"), UserCtrl.update);


module.exports = router