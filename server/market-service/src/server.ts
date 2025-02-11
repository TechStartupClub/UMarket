import express from "express";
import marketRoutes from "./routes/marketRoutes";  // Assuming the correct path

const app = express();

// Other middleware and routes setup
app.use("/api", marketRoutes);