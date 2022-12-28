const { requestLeave } = require("../controller/leave.controller");
const { verifyToken } = require("../middleware/verifyToken");
const { verifyHosteller } = require("../middleware/verifyUser");

const router = require("express").Router();

router.post("/", verifyToken, verifyHosteller, requestLeave)

module.exports = router;