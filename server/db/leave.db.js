const pool = require("../config/index");

const createLeaveDb = async (subject, from_date, to_date, reason, vehicle, roommate_id, place, warden_id, hosteller_id) => {
    const { rows } = await pool.query("INSERT INTO public.leave(subject, from_date, to_date, reason, vehicle, roommate_id, place, warden_id, hosteller_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id, subject, from_date, to_date, reason, vehicle, roommate_id, place, warden_id, hosteller_id",
        [subject, from_date, to_date, reason, vehicle, roommate_id, place, warden_id, hosteller_id]
    );
    return rows[0];
}


module.exports = {
    createLeaveDb,
}