import { Room, Question, User } from "../models/index.js";

class AdminRoomController {
  async list(req, res) {
    try {
      const rooms = await Room.findAll({
        include: [
          { model: User, as: "owner", attributes: ["id", "email", "role"] },
          { model: Question, as: "questions" },
        ],
        order: [["createdAt", "DESC"]],
      });

      const normalized = rooms.map((room) => ({
        id: room.id,
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
        owner: room.owner,
        questionsCount: room.questions?.length || 0,
      }));

      res.json(normalized);
    } catch (error) {
      console.error("Error listing rooms:", error);
      res.status(500).json({ error: "Failed to fetch rooms" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const room = await Room.findByPk(id, {
        include: [
          { model: User, as: "owner", attributes: ["id", "email", "role"] },
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
        updatedAt: room.updatedAt,
        owner: room.owner,
        questions: room.questions,
      });
    } catch (error) {
      console.error("Error fetching room:", error);
      res.status(500).json({ error: "Failed to fetch room" });
    }
  }

  async create(req, res) {
    try {
      const { password, userId } = req.body;

      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      const room = await Room.create({ password, userId: userId || null });

      res.status(201).json({ id: room.id, message: "Room created" });
    } catch (error) {
      console.error("Error creating room:", error);
      res.status(500).json({ error: "Failed to create room" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { password, userId } = req.body;

      const room = await Room.findByPk(id);
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      if (password) {
        room.password = password;
      }

      if (userId !== undefined) {
        room.userId = userId || null;
      }

      await room.save();

      res.json({ message: "Room updated" });
    } catch (error) {
      console.error("Error updating room:", error);
      res.status(500).json({ error: "Failed to update room" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const room = await Room.findByPk(id);
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      await Question.destroy({ where: { roomId: id } });
      await room.destroy();

      res.json({ message: "Room deleted" });
    } catch (error) {
      console.error("Error deleting room:", error);
      res.status(500).json({ error: "Failed to delete room" });
    }
  }
}

export default new AdminRoomController();
