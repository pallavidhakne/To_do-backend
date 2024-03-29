import Express from "express";
const router = Express.Router();
import Task from "../model/taskModel.js";

//post request
router.post("/task", async (req, res) => {
  console.log(req.body);
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//get request
// router.get("/task", async (req, res) => {
//   try {
//     const allTask = await Task.find();
//     res.json(allTask);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
router.get("/task", async (req, res) => {
  try {
    const { completed, sortByDate } = req.query;
    //console.log(`req query is ${req.query}`);
    let query = {};
    let sortOptions = {};

    // Filter by completion status if provided
    if (completed) {
      query.completed = completed === "true";
    }

    // Determine sorting order
    if (sortByDate) {
      sortOptions.date = sortByDate === "desc" ? -1 : 1;
    }

    const tasks = await Task.find(query).sort(sortOptions);
    res.json(tasks);
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
