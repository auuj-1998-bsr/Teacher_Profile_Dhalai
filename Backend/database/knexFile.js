const config = {

 development: {
  client: "pg",
  connection: {
   host: "127.0.0.1",
   user: "postgres",
   password: "postgres",
   database: "postgres",
    port: 5432
  }
 },

 production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      keepAlive: true   // 🔥 IMPORTANT FIX
    },
    pool: {
      min: 0,
      max: 1,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 10000,
      idleTimeoutMillis: 10000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 2000
    }
  }

};
export default config;