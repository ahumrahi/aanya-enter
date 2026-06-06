import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat.route";


const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://aanya-enter.vercel.app"
    ]
  })
);

app.use(express.json());

app.use("/", chatRouter);

app.get("/", (req, res) => {
  res.send("Sales Agent Running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP"
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});