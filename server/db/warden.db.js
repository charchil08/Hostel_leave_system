const pool = require("../config/index")

const createWardenDb = async ({ name, contact_no, mail, password }) => {
    const { rows } = await pool.query(
        "INSERT INTO warden(name, contact_no, mail, password) VALUES($1,$2,$3,$4) returning id, name, contact_no, mail, role, hostel_type, created_at",
        [name, contact_no, mail, password]
    );

    return rows[0];

}

const getWardenByMailDb = async (mail) => {
    const { rows } = await pool.query(
        "SELECT * FROM warden where lower(mail)=lower($1)"
        , [mail])

    return rows[0];
}

const getWardenByContactNoDb = async (contact_no) => {
    const { rows } = await pool.query(
        "SELECT * FROM warden where contact_no=$1"
        , [contact_no])

    return rows[0];
}



module.exports = {
    getWardenByMailDb,
    getWardenByContactNoDb,
    createWardenDb
}