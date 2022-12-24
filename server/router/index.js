const router = require("express").Router()
const auth = require("./auth.router")

router.use("/auth", auth);


module.exports = router;