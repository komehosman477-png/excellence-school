const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + "/.."));

// MySQL connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    port: 3307,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "excellence_school"
});

// Make database available to routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Admissions route
const admissionsRoutes = require("./routes/admissions");
app.use("/api/admissions", admissionsRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Excellence School Backend is Running!");
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log("❌ MySQL connection failed:");
        console.log(err.message);
        return;
    }

    console.log("✅ Connected to Excellence School database");
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});