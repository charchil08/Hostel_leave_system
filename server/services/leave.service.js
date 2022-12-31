const { createLeaveDb, getAllLeaveRequestsForHostellerDb, getLeaveReuestByIdDb, updateLeaveRequestDb, deleteLeaveRequestDb } = require("../db/leave.db");
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

    async getAllLeaveRequestHosteller(hosteller_id, next) {
        try {
            const leaves = await getAllLeaveRequestsForHostellerDb(hosteller_id);
            return leaves;
        } catch (error) {
            return next(error.statusCode, error.message);
        }
    }

    async getLeaveRequestById(id, hosteller_id, next) {
        try {
            const leave = await getLeaveReuestByIdDb(id);
            if (!leave || (leave && leave.hosteller_id !== hosteller_id)) {
                return next(new ErrorHandler(401, "Access denied"))
            }
            return leave;
        } catch (error) {
            return next(error.statusCode, error.message);
        }
    }

    async updateLeaveRequest({ id, subject, from_date, to_date, reason, vehicle, roommate_id, place, hosteller_id }, next) {
        try {
            if (!subject || !from_date || !to_date || !reason || !vehicle || !roommate_id || !place) {
                return next(new ErrorHandler(401, "All fields required"))
            }
            if (new Date(from_date) <= Date.now()) {
                return next(new ErrorHandler(401, "Past request can not be updated"))
            }
            const leave = await getLeaveReuestByIdDb(id);

            if (!leave || (leave && leave.hosteller_id !== hosteller_id)) {
                return next(new ErrorHandler(401, "Access denied"))
            }

            const updatedLeave = await updateLeaveRequestDb(id, subject, from_date, to_date, reason, vehicle, roommate_id, place);
            return updatedLeave;
        } catch (error) {
            return next(error.statusCode, error.message);
        }
    }

    async deleteLeaveRequest(id, hosteller_id, next) {
        try {
            const leave = await getLeaveReuestByIdDb(id);
            if (!leave || (leave && leave.hosteller_id !== hosteller_id)) {
                return next(new ErrorHandler(401, "Access denied"))
            }
            if (leave.status && leave.status === 'a') {
                return next(new ErrorHandler(401, "Accepted leave can not be deleted"))
            }
            const deletedLeave = await deleteLeaveRequestDb(id);
            return deletedLeave;
        } catch (error) {
            return next(error.statusCode, error.message);
        }
    }

}


module.exports = {
    leaveService: new LeaveService(),
}