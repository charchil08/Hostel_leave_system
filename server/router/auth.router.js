const { createAccountWarden } = require("../controller/auth.controller");

const router = require("express").Router();

router.post("/signup", createAccountWarden)

module.exports = router;