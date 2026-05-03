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
        rejectUnauthorized: false 
      }
    },
   pool: {
    min: 0,
    max: 2,
    idleTimeoutMillis: 30000,      
    createTimeoutMillis: 10000,   
    acquireTimeoutMillis: 60000,   
    destroyTimeoutMillis: 5000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 200,
  },
  acquireConnectionTimeout: 60000 
  }
};

export default config;