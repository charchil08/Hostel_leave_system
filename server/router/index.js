const router = require("express").Router()
const auth = require("./auth.router")
const room = require("./room.router")

router.use("/auth", auth);
router.use("/room", room);

module.exports = router;