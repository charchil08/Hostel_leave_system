const { Pool } = require("pg");

require("dotenv").config()

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({ connectionString: connectionString });

module.exports = pool;