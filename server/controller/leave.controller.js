const { leaveService } = require("../services/leave.service");

const requestLeave = async (req, res, next) => {
    const leaveData = { ...req.body, hosteller_id: req.user.id };

    const newLeave = await leaveService.requestLeave(leaveData, next);

    if (newLeave === undefined) {
        return;
    }

    return res.status(201).json({
        status: "success",
        leave: newLeave,
    })
}

const getAllRequestsForHosteller = async (req, res, next) => {
    const leaves = await leaveService.getAllLeaveRequestHosteller(req.user.id, next);
    if (!leaves) {
        return;
    }
    return res.status(200).json({
        status: "sucess",
        length: leaves.length,
        leaves
    })
}

const getLeaveRequestById = async (req, res, next) => {
    const leave = await leaveService.getLeaveRequestById(req.params.id, req.user.id, next);
    if (!leave) {
        return;
    }
    return res.status(200).json({
        status: "success",
        leave,
    });
}

const updateLeaveRequest = async (req, res, next) => {
    const leaveData = { ...req.body, hosteller_id: req.user.id, id: req.params.id };
    const updatedLeave = await leaveService.updateLeaveRequest(leaveData, next);

    if (updatedLeave === undefined) {
        return;
    }

    return res.status(201).json({
        status: "success",
        leave: updatedLeave,
    })
}

const deleteLeaveRequest = async (req, res, next) => {
    const deletedLeave = await leaveService.deleteLeaveRequest(req.params.id, req.user.id, next);
    if (!deletedLeave) {
        return;
    }
    return res.status(201).json({
        status: "success",
        leave: deletedLeave,
    })
}

module.exports = { requestLeave, getAllRequestsForHosteller, getLeaveRequestById, updateLeaveRequest, deleteLeaveRequest };