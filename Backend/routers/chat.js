import express from "express";
import Thread from "../models/Thread.js";
import getOllamaResponse from "../utils/ollama.js";

const router = express.Router();

// router.post("/test", async (req, res) => {
//     try {
//         const thread = new Thread({
//             threadId: "321ice",
//             title: "New From pc"
//         });
//         const resp = await thread.save();
//         return res.json(resp);
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Failed to create thread" });
//     }
// });

router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
        return res.json(threads);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch threads" });
    }
});

router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({ threadId });
        if (!thread) return res.status(404).json({ error: "Thread not found" });
        return res.json(thread.messages);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch chat" });
    }
});

router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOneAndDelete({ threadId });
        if (!thread) return res.status(404).json({ error: "Thread not found" });
        return res.json(thread);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete thread" });
    }
});

router.post("/chat", async (req, res) => {
    const { threadId, messages } = req.body;
    const message=messages;
    console.log(req.body);
    if (!threadId || !message){
        console.log("Missing", {threadId,message});
        return res.status(400).json({ error: "Missing required fields" });
    } 

    try {
        let thread = await Thread.findOne({ threadId });

        if (!thread) {
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }]
            });
        } else {
            thread.messages.push({ role: "user", content: message });
        }

        const assistantReply = await getOllamaResponse(message);
        thread.messages.push({ role: "assistant", content: assistantReply });
        thread.updatedAt = new Date();

        await thread.save();
        return res.json({ reply: assistantReply });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

export default router;
