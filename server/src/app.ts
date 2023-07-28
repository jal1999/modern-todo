import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { connectToDb } from "./util/mongooseConnector";
import { PORT } from "./util/secrets";

const app = express();

// Connect to DB
connectToDb();

// Configuration
app.set("port", PORT);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes

export default app;