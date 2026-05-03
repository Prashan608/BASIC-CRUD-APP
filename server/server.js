const express = require("express");
const connectToDb = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const bookRoutes = require("./routes/bookRoutes");

const app = express();

// ✅ CORS (Proper config for Vite frontend)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

// ✅ Body Parser
app.use(express.json());

// ✅ DB Connect
connectToDb();

// ✅ Routes
app.use("/books", bookRoutes);

// ✅ Test Route
app.get("/test", (req, res) => {
  res.status(200).json({ msg: "test route is working" });
});

// ✅ PORT
const PORT = process.env.PORT || 5000;

// ✅ Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});