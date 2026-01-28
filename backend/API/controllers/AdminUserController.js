import { User } from "../models/index.js";

const sanitizeRole = (role) => (role === "admin" ? "admin" : "user");

class AdminUserController {
  async list(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "email", "role", "createdAt"],
        order: [["createdAt", "DESC"]],
      });
      res.json(users);
    } catch (error) {
      console.error("Error listing users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: ["id", "email", "role", "createdAt"],
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  async create(req, res) {
    try {
      const { email, password, role } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: "Email already registered" });
      }

      const user = await User.create({
        email,
        password,
        role: sanitizeRole(role),
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, password, role } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (email) {
        user.email = email;
      }

      if (password) {
        user.password = password;
      }

      if (role) {
        user.role = sanitizeRole(role);
      }

      await user.save();

      res.json({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (Number(id) === Number(req.user.id)) {
        return res
          .status(400)
          .json({ error: "You cannot delete your own account" });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await user.destroy();

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
}

export default new AdminUserController();
