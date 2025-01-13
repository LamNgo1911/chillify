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
  "https://d2ck4ivhb1ljuy.cloudfront.net/",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Enable CORS credentials
};

// Middleware
app.use(mongoSanitize());
app.use(morgan("tiny"));
app.use(cors(corsOptions));
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

// Check if the environment is serverless or traditional
if (process.env.SERVERLESS === "true") {
  // Export for serverless environment (e.g., AWS Lambda)
  const serverless = require("serverless-http");
  module.exports.handler = serverless(app);
} else {
  // For traditional environments, listen on the dynamic port
  const port = process.env.PORT || 3000; // Default to port 3000 if not set by the environment
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
