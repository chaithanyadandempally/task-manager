const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ✅ FIRST create app
const app = express();

// ✅ THEN use middleware
app.use(cors());
app.use(express.json());

// ✅ THEN import routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

// ✅ THEN use routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ Test route
app.get("/", (req, res) => {
    res.send("API Running");
});

// ✅ Start server
app.listen(5000, () => console.log("Server running on port 5000"));