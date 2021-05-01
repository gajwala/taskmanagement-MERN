import express from "express";
const router = express.Router();

import {
  createMentor,
  getMentor,
  getMentorWithTask,
  updateMentor,
  deleteMentor,
} from "../controllers/mentor.js";

router.post("/create", createMentor);
router.get("/", getMentor);
router.patch("/:id", updateMentor);
router.get("/:id", getMentorWithTask);
router.delete("/:id", deleteMentor);

export default router;
