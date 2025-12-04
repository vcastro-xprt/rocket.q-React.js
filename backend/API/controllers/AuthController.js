import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
  });

class AuthController {
  async signup(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: "Email already registered" });
      }

      const user = await User.create({ email, password });
      const token = generateToken(user.id);

      res.status(201).json({
        user: { id: user.id, email: user.email },
        token,
      });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ error: "Failed to create account" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isPasswordValid = await user.checkPassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generateToken(user.id);

      res.json({
        user: { id: user.id, email: user.email },
        token,
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  }
}

export default new AuthController();
