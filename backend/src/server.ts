import express from "express";
import cors from "cors";

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

app.get("/", (req, res) => {
  res.send("Sales Agent Running");
});

app.get(
 "/health",
 (req,res)=>{

  res.json({
    status:"UP"
  });

 });

app.listen(3001, () => {
  console.log("Running");
});