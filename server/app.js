require("dotenv").config();
// async errors
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");

// Define CORS options
const allowedOrigins = [
  "https://bespoke-frangollo-b3a1d3.netlify.app",
  "http://localhost:3000",
  "https://d2ck4ivhb1ljuy.cloudfront.net",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from the allowed origins
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Enable CORS credentials
  preflightContinue: false, // Ensures preflight requests are handled by Express
  optionsSuccessStatus: 204, // For legacy browser support (like IE11)
};

// Middleware
app.use(mongoSanitize());
app.use(morgan("tiny"));
app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "It works!" });
});

// User routes
const userRoutes = require("./routes/auth");
app.use("/api/v1/auth", userRoutes);

// Songs routes
const songsRoutes = require("./routes/songs");
app.use("/api/v1/chart", songsRoutes);

// Albums routes
const albumsRoutes = require("./routes/albums");
app.use("/api/v1/chart", albumsRoutes);

// Artists routes
const artistsRoutes = require("./routes/artists");
app.use("/api/v1/chart", artistsRoutes);

// Error-handling middleware
const notFound = require("./middleware/not-found");
app.use(notFound);
const errorHandler = require("./middleware/error");
app.use(errorHandler);

// Connect to MongoDB
const connectDB = require("./config/db");
(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
})();

const serverless = require("serverless-http");
module.exports.handler = serverless(app);
