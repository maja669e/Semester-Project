const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.url, {
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  pool: dbConfig.pool
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅Connected to Supabase database");
  } catch (error) {
    console.error("❌Connection failed:");
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };