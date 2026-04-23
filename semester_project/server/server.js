const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple test route
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

const db = require("./models");

// Test DB connection
db.sequelize.authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to DB:", err);
  });

// Sync database
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./routes/item.routes.js")(app);
require("./routes/category.routes")(app);
require("./routes/itemAccessory.routes")(app);
require("./routes/rental.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});