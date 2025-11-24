const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// Configure CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Middleware for cookies and JSON parsing with size limits
app.use(cookieParser());
app.use(express.json({ limit: "5mb" })); // Set JSON payload size limit
app.use(express.urlencoded({ limit: "5mb", extended: true })); // Set URL-encoded payload size limit

// API Routes
app.use("/api", router);

const PORT = 8080 || process.env.PORT;

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
