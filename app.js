import express from "express";
import appRouter from "./router/appRouter";

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api", appRouter);

export default app;