import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3500;
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
