import express from "express";
const router = express.Router();

import { createTask, deleteTask, updateTask } from "../controllers/task.js";

router.post("/create", createTask);
router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);

export default router;
