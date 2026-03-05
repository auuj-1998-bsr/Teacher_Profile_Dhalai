import knex from "knex";
import config from "./knexFile.js";

const db = knex(config.development);
export default db;


