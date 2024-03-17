import Express from "express";
const router = Express.Router();
import Task from "../model/taskModel.js";

//post request
router.post("/task", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//get request
router.get("/task", async (req, res) => {
  try {
    const allTask = await Task.find();
    res.json(allTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//for specific data
router.get("/task/:id", async (req, res) => {
  try {
    const singleTask = await Task.findById(req.params.id);
    if (!singleTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(singleTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//routes for update data
router.patch("/task/:id", async (req, res) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updateTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//delete task
router.delete("/task/:id", async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
