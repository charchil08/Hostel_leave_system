const { requestLeave, getAllRequestsForHosteller, deleteLeaveRequest, updateLeaveRequest, getLeaveRequestById } = require("../controller/leave.controller");
const { verifyToken } = require("../middleware/verifyToken");
const { verifyHosteller } = require("../middleware/verifyUser");

const router = require("express").Router();

router.route("/")
    .get(verifyToken, verifyHosteller, getAllRequestsForHosteller)
    .post(verifyToken, verifyHosteller, requestLeave)

router.route("/:id")
    .put(verifyToken, verifyHosteller, updateLeaveRequest)
    .get(verifyToken, verifyHosteller, getLeaveRequestById)
    .delete(verifyToken, verifyHosteller, deleteLeaveRequest);


module.exports = router;