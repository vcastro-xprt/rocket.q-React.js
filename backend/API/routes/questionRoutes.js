import express from "express";
import QuestionController from "../controllers/QuestionController.js";

const router = express.Router();

// POST /api/questions/create - Create a new question
router.post("/create", QuestionController.create);

// GET /api/questions/room/:roomId - Get all questions for a room
router.get("/room/:roomId", QuestionController.getByRoom);

// GET /api/questions/:id - Get single question
router.get("/:id", QuestionController.show);

// PUT /api/questions/:id/read - Mark question as read
router.put("/:id/read", QuestionController.markAsRead);

// DELETE /api/questions/:id - Delete a question
router.delete("/:id", QuestionController.delete);

export default router;
