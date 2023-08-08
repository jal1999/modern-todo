import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todoListRoutes";

import { connectToDb } from "./util/mongooseConnector";
import { PORT } from "./util/secrets";

const app = express();

// Connect to DB
connectToDb();

// Configuration
app.set("port", PORT);

// Middleware
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

export default app;