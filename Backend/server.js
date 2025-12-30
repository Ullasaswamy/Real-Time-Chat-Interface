import fetch from "node-fetch"; // npm install node-fetch
import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import chatRoute from "./routers/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api",chatRoute);

// app.post("/test", async (req, res) => {
//   const { messages } = req.body;
//   const option = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//     model: "llama3.1:8b",
//     messages: messages,
//     stream: false   // 👈 important
//   }),

//   };

//   try {
//     const response = await fetch("http://localhost:11434/api/chat", option);
//     const data = await response.json(); // ✅ await
//     console.log(data.message.content);
//     res.send(data.message.content);

//     res.json(data); // send response back to client
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });

const ConnectmongoDB=async()=>{
  try{  
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully...")
  }
  catch(err){
    console.log("Database not connected",err);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  ConnectmongoDB();
});
