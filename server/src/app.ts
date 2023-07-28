import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { connectToDb } from "./util/mongooseConnector";

const app = express();

// Connect to DB
connectToDb();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes

export default app;