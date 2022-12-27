const pool = require("../config/index");

const createRoommateDb = async (room_id, hosteller_id) => {
    const { rows } = await pool.query("INSERT INTO public.roommate(room_id,hosteller_id) VALUES($1,$2) returning id", [room_id, hosteller_id]);
    return rows[0].id;
}

module.exports = {
    createRoommateDb,
}