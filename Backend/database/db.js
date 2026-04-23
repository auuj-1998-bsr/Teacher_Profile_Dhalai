// import knex from "knex";
// import config from "./knexFile.js";
// const env = process.env.NODE_ENV || "development";
// const db = knex(config[env]);
// export default db;




import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // ✅ Neon के लिए जरूरी
  },
  max: 1, // 🔥 VERY IMPORTANT (Neon free tier)
});

// logs (optional but helpful)
pool.on("connect", () => {
  console.log("DB Connected ✅");
});

pool.on("error", (err) => {
  console.error("DB ERROR:", err.message);
});

export default pool;