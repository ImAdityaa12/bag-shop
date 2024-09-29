import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import ownerRouter from "./routes/ownersRouter";
import usersRouter from "./routes/usersRouter";
import productsRouter from "./routes/productsRouter";
import flash from "connect-flash";
dotenv.config();
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  expressSession({
    resave: true,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET as string,
  })
);
app.use(flash());
app.use("/owners", ownerRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.listen(7000, () => {
  console.log("Server started on localhost 7000");
});
