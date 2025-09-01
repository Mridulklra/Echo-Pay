import express from 'express';
import cors from 'cors';
import Rootrouter from './routes/index.js';
import dbconnection from './db.js'; // assuming db.js exports default function

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", Rootrouter);

// Database connection and server start
dbconnection()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
