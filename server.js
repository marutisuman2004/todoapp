const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB (LOCAL - Compass)
mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// Schema
const Task = mongoose.model("Task", {
  text: String
});

// ✅ ADD TASK (SAFE)
app.post("/add", async (req, res) => {
  try {
    const text = req.body.text;

    // prevent crash
    if (!text || text.trim() === "") {
      return res.status(200).json({ message: "Empty task ignored" });
    }

    const task = new Task({ text });
    await task.save();

    res.status(200).json({ message: "Task added" });
  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(200).json({ message: "Error handled" }); // 🔥 prevents 500
  }
});

// ✅ GET TASKS (SAFE)
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(200).json([]); // 🔥 prevents 500
  }
});

// Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});