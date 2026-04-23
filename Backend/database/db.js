import knex from "knex";
import config from "./knexFile.js";
const env = process.env.NODE_ENV || "development";
const db = knex(config[env]);
console.log("DB INSTANCE CREATED");
export default db;