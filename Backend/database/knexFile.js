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
   ssl: {
    require: true,
    rejectUnauthorized: false
   }
  }
 }

};
export default config;