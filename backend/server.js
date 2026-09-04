const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Crypto Backend Running");
});

pool.query("SELECT NOW()", (err) => {
  if (err) {
    console.log("❌ Database Connection Failed");
    console.log(err.message);
  } else {
    console.log("✅ Database Connected");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});