import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import morgan from "morgan";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3500;
const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);

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