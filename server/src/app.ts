import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth";

import { connectToDb } from "./util/mongooseConnector";
import { MONGO_URI, PORT } from "./util/secrets";

const app = express();

// Connect to DB
connectToDb(MONGO_URI);

// Configuration
app.set("port", PORT);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

export default app;