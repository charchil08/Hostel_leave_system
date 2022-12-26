const { createAccountWarden, loginWarden } = require("../controller/auth.controller");

const router = require("express").Router();

router.post("/signup", createAccountWarden)
router.post("/signin", loginWarden)

module.exports = router;