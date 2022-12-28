const { leaveService } = require("../services/leave.service");

const requestLeave = async (req, res, next) => {
    const leaveData = { ...req.body, hosteller_id: req.user.id };
    console.log(leaveData);

    const newLeave = await leaveService.requestLeave(leaveData, next);

    if (newLeave === undefined) {
        return;
    }

    return res.status(201).json({
        status: "success",
        leave: newLeave,
    })

}

module.exports = { requestLeave };