import express from "express";
import { salesAgent } from "../agents/salesagent";

const router = express.Router();

router.post("/chat", async(req,res)=>{

 const answer =
 await salesAgent(req.body.question);

 res.json({
   answer
 });

});

export default router;