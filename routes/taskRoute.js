import Express from "express";
const router = Express.Router();
import Task from "../model/taskModel.js";
router.post("/task", async (req, res) => {
  try {
    const newTask = await Task.createData(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.send(400).json({ message: error.message });
  }
});
router.get("/task", async (req, res) => {
  try {
    const allTask = await Task.getAllData();
    res.json(allTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//for specific data
router.get("/task/:id", async (req, res) => {
  try {
    const singleTask = await Task.getDataById(req.params.id);
    res.json(singleTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//routes for update data
router.patch("/task/:id", async (req, res) => {
  try {
    const updateTask = await Task.updateData(req.params.id, req.body);
    res.json(updateTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//delete task
router.delete("/task/:id", async (req, res) => {
  try {
    const deleteTask = await Task.deleteData(req.params.id);
    res.json(deleteTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
