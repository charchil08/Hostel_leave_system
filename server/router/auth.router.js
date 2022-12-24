const { createAccount } = require("../controller/auth.controller");

const router = require("express").Router();

router.get("/signup", createAccount)

module.exports = router;