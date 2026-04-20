import knex from "knex";
import config from "./knexFile.js";
const env = process.env.NODE_ENV || "development";
const db = knex(config[env]);
db.client.pool.on("error", (err) => {
  console.error("POOL ERROR:", err.message);
});
export default db;