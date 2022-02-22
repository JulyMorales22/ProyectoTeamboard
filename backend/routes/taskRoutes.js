import express from "express";
import task from "../controllers/taskController.js";

const router = express.Router();

router.post("/registerTask", task.registerTask)
router.get("/listTask/:name?", task.listTask)
router.delete("/deleteTask/:_id", task.deleteTask)
router.put("/updateTask", task.updateTask)

export default router;