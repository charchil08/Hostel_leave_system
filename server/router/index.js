const router = require("express").Router();
const auth = require("./auth.router");
const room = require("./room.router");
const hosteller = require("./hosteller.router");

router.use("/auth", auth);
router.use("/room", room);
router.use("/hosteller", hosteller);

module.exports = router;