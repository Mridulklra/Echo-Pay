import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import Rootrouter from "../backend/routes/index.js";
import dbconnection from "../backend/db.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", Rootrouter);

// Database connection (connect only once)
let isConnected = false;
async function connectDB() {
  if (!isConnected) {
    try {
      await dbconnection();
      console.log("Database connected successfully");
      isConnected = true;
    } catch (err) {
      console.error("Database connection failed:", err);
    }
  }
}
connectDB();

// Export for Vercel
export default serverless(app);
