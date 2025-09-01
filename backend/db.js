import mongoose from "mongoose";

const DB_URL =
  "mongodb+srv://mridulkalra:Password@cluster0.u0ytp9l.mongodb.net/paytmDB?retryWrites=true&w=majority&appName=Cluster0";

// Database connection
export const dbconnection = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,   // fixed typo
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,   // fixed typo
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,   // fixed typo
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,   // fixed typo
  },
});

// Account Schema
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  account: {
    type: Number,
    required: true,
  },
});

// Models
export const Account = mongoose.model("Account", accountSchema);
export const User = mongoose.model("User", userSchema);
export default dbconnection;