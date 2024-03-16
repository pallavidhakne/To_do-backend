import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});
const Task = mongoose.model("Task", TaskSchema);
export default Task;
