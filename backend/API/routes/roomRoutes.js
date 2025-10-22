import express from "express";
import RoomController from "../controllers/RoomController.js";

const router = express.Router();

// POST /api/rooms/create - Create a new room
router.post("/create", RoomController.create);

// POST /api/rooms/enter - Enter a room with password
router.post("/enter", RoomController.enter);

// GET /api/rooms/:id - Get room details with questions
router.get("/:id", RoomController.show);

// DELETE /api/rooms/:id - Delete a room
router.delete("/:id", RoomController.delete);

export default router;
