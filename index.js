import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskrouter from "./routes/taskRoute.js";

dotenv.config();
const app = Express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("hello welcome to the TO-do list project");
});
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected succesfully");
  } catch (err) {
    console.log("Error occurs while connecting to MONGODB", err);
  }
}

connectToDatabase(); //function call
//routers
app.use("/", taskrouter);

app.listen(port, () => {
  console.log(`Server is running on this port ${port}`);
});
