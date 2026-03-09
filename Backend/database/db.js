// import knex from "knex";
// import config from "./knexFile.js";
// const db = knex(config.development);
// export default db;




import knex from "knex";
import config from "./knexFile.js";

const env = process.env.NODE_ENV || "development";

const db = knex(config[env]);

export default db;