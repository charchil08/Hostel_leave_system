const { createAccountHosteller } = require("../controller/hosteller.controller");

const router = require("express").Router();

router.post("/signup", createAccountHosteller);
router.post("/signin",);
// router.get("/signout", logoutWarden);

module.exports = router;