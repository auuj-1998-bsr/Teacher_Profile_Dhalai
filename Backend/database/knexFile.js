// export default {
//   development: {
//     client: "pg",
//     connection: {
//       host: "localhost",
//       user: "postgres",
//       password: "postgres",
//       database: "postgres",
//       port: 5432
//     }
//   }
// };



export default {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL
  }
};