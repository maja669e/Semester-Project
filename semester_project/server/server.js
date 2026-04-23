require("dotenv").config();

const express = require("express");
const { connectDB } = require("./models"); 

const app = express();

app.use(express.json());


(async () => {
  await connectDB();

  app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
  });
})();