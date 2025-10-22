import { Question, Room } from "../models/index.js";

class QuestionController {
  // Create a new question
  async create(req, res) {
    try {
      const { text, roomId } = req.body;

      if (!text || !roomId) {
        return res
          .status(400)
          .json({ error: "Question text and room ID are required" });
      }

      // Verify room exists
      const room = await Room.findByPk(roomId);
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      const question = await Question.create({
        text: text.trim(),
        roomId,
        isRead: false,
      });

      res.status(201).json({
        id: question.id,
        text: question.text,
        isRead: question.isRead,
        roomId: question.roomId,
        createdAt: question.createdAt,
        message: "Question created successfully",
      });
    } catch (error) {
      console.error("Error creating question:", error);
      res.status(500).json({ error: "Failed to create question" });
    }
  }

  // Get questions for a room
  async getByRoom(req, res) {
    try {
      const { roomId } = req.params;

      // Verify room exists
      const room = await Room.findByPk(roomId);
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      const questions = await Question.findAll({
        where: { roomId },
        order: [["createdAt", "DESC"]],
      });

      res.json(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  }

  // Mark question as read
  async markAsRead(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      const question = await Question.findByPk(id, {
        include: [
          {
            model: Room,
            as: "room",
          },
        ],
      });

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      // Verify room password
      const isValidPassword = await question.room.checkPassword(password);

      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid password" });
      }

      question.isRead = true;
      await question.save();

      res.json({
        id: question.id,
        text: question.text,
        isRead: question.isRead,
        roomId: question.roomId,
        createdAt: question.createdAt,
        message: "Question marked as read",
      });
    } catch (error) {
      console.error("Error marking question as read:", error);
      res.status(500).json({ error: "Failed to mark question as read" });
    }
  }

  // Delete a question
  async delete(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      const question = await Question.findByPk(id, {
        include: [
          {
            model: Room,
            as: "room",
          },
        ],
      });

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      // Verify room password
      const isValidPassword = await question.room.checkPassword(password);

      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid password" });
      }

      await question.destroy();

      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ error: "Failed to delete question" });
    }
  }

  // Get single question
  async show(req, res) {
    try {
      const { id } = req.params;

      const question = await Question.findByPk(id);

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      res.json(question);
    } catch (error) {
      console.error("Error fetching question:", error);
      res.status(500).json({ error: "Failed to fetch question" });
    }
  }
}

export default new QuestionController();
