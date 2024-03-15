import Express from "express";
const app = Express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("hello welcome to the TO-do list project");
});
app.listen(port, () => {
  console.log(`Server is running on this port ${port}`);
});
