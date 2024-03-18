import cron from "node-cron";
import Task from "./model/taskModel.js";
const deleteOldTasks = () => {
  console.log("Initializing cron job for task deletion.");
  cron.schedule(
    "* * * * *",
    async () => {
      // For immediate testing, runs every minute
      console.log("Running scheduled task to delete old tasks at", new Date());
      const sevenDaysAgo = new Date(
        new Date().setDate(new Date().getDate() - 7)
      );

      try {
        const result = await Task.deleteMany({
          date: { $lt: sevenDaysAgo },
        });
        console.log("Deleted tasks older than 7 days:", result.deletedCount);
      } catch (err) {
        console.error("Error deleting old tasks:", err);
      }
    },
    {
      scheduled: true,
      timezone: "UTC",
    }
  );
};
export default deleteOldTasks;
