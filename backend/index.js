import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { users } from "./models/userSchema.model.js";
import router from "./routes/user.router.js";

dotenv.config(); // Load environment variables

// Enable CORS for all routes
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

const app = express();
const port = process.env.PORT || 4002;
const DB_URI = process.env.MONGO_URI;


// Connect to MongoDB
mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Middleware
app.use(cors());
app.use(express.json());

app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
