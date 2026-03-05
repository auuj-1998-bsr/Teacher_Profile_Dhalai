export default {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }
};