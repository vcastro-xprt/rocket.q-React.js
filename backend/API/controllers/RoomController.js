import { Room, Question } from "../models/index.js";

class RoomController {
  // Create a new room
  async create(req, res) {
    try {
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      const room = await Room.create({ password });

      res.status(201).json({
        id: room.id,
        message: "Room created successfully",
      });
    } catch (error) {
      console.error("Error creating room:", error);
      res.status(500).json({ error: "Failed to create room" });
    }
  }

  // Enter a room (validate password)
  async enter(req, res) {
    try {
      const { roomId, password } = req.body;

      if (!roomId || !password) {
        return res
          .status(400)
          .json({ error: "Room ID and password are required" });
      }

      const room = await Room.findByPk(roomId);

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      const isValidPassword = await room.checkPassword(password);

      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid password" });
      }

      res.json({
        id: room.id,
        message: "Access granted",
      });
    } catch (error) {
      console.error("Error entering room:", error);
      res.status(500).json({ error: "Failed to enter room" });
    }
  }

  // Get room details with questions
  async show(req, res) {
    try {
      const { id } = req.params;

      const room = await Room.findByPk(id, {
        include: [
          {
            model: Question,
            as: "questions",
            order: [["createdAt", "DESC"]],
          },
        ],
      });

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      res.json({
        id: room.id,
        createdAt: room.createdAt,
        questions: room.questions,
      });
    } catch (error) {
      console.error("Error fetching room:", error);
      res.status(500).json({ error: "Failed to fetch room details" });
    }
  }

  // Delete a room
  async delete(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      const room = await Room.findByPk(id);

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      const isValidPassword = await room.checkPassword(password);

      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Delete all questions in the room first
      await Question.destroy({ where: { roomId: id } });

      // Delete the room
      await room.destroy();

      res.json({ message: "Room deleted successfully" });
    } catch (error) {
      console.error("Error deleting room:", error);
      res.status(500).json({ error: "Failed to delete room" });
    }
  }
}

export default new RoomController();
