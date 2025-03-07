const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");
const ticketRoutes = require("./routes/ticket.routes"); // Add this line

const app = express();
dotenv.config();
// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes); // Add this line

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
