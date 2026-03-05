// import knex from "knex";
// import config from "./knexFile.js";

// const db = knex(config.development);
// export default db;


import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;