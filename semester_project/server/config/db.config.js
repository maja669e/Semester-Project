/*module.exports = {
  HOST: "localhost",            // We use the host of localhost.
  USER: "root",                 // Use the defined root for you DB.
  PASSWORD: "[YOUR_PASSWORD]",  // Use the defined password to access from your DB.
  DB: "library_db",             // We just use the create database library_db.
  dialect: "mysql",             // We use the dialect of mysql.
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};*/
module.exports = {
  url: process.env.DATABASE_URL,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};