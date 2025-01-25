import express from 'express'; // Importing express to create an Express app
import cors from 'cors'; // Importing CORS middleware for cross-origin resource sharing
import dotenv from 'dotenv'; // Importing dotenv to load environment variables
import cookieParser from 'cookie-parser'; // Importing cookieParser middleware to parse cookies
import authRoutes from "./routes/auth.route.js"; // Importing authentication routes
import adminRoutes from "./routes/admin.route.js"; // Importing admin routes
import appointmentRoutes from "./routes/appointment.route.js"; // Importing appointment routes
import applicantRoutes from "./routes/applicant.route.js"; // Importing applicant routes
import userRoutes from "./routes/user.route.js";
import workerRoutes from "./routes/worker.route.js";
import { connectDB } from './db/connectDB.js'; // Importing database connection function

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application
const PORT = process.env.PORT || 5000; // Set the server port (defaults to 5000 if not set in environment variables)

// Middleware to parse incoming JSON data in requests
app.use(express.json());

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Middleware to parse URL-encoded data (like form submissions)
app.use(express.urlencoded({ extended: true }));

// CORS middleware configuration for handling cross-origin requests
app.use(cors({
  origin: process.env.CLIENT_URL, // Allow requests from the frontend on localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers in requests
  credentials: true // Allow credentials (cookies, HTTP authentication) in requests
}));

// Route handlers for different API endpoints
app.use("/api/auth", authRoutes); // Handles authentication-related routes
app.use("/api/admin", adminRoutes); // Handles admin-related routes
app.use("/api/appointment", appointmentRoutes); // Handles appointment-related routes
app.use("/api/applicant", applicantRoutes); // Handles applicant-related routes
app.use("/api/user", userRoutes);
app.use("/api/worker", workerRoutes);

// Start the Express server and connect to the database
app.listen(PORT, () => {
  connectDB(); // Connect to the database
  console.log("Server Running on Port:", PORT); // Log the server start message
})
