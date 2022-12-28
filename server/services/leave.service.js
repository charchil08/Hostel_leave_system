const { createLeaveDb } = require("../db/leave.db");
const { getWardenIdByHostellerId } = require("../db/warden.db");
const { ErrorHandler } = require("../middleware/error");

class LeaveService {
    async requestLeave({ subject, from_date, to_date, reason, vehicle, roommate_id, place, hosteller_id }, next) {
        try {

            const warden_id = await getWardenIdByHostellerId(hosteller_id);

            if (!subject || !from_date || !to_date || !reason || !vehicle || !roommate_id || !place || !warden_id || !hosteller_id) {
                return next(new ErrorHandler(401, "All fields required"))
            }

            const newLeave = await createLeaveDb(subject, from_date, to_date, reason, vehicle, roommate_id, place, warden_id, hosteller_id);
            return newLeave;
        } catch (err) {
            return next(err.statusCode, err.message);
        }
    }
}


module.exports = {
    leaveService: new LeaveService(),
}