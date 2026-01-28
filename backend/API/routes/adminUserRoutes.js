import express from "express";
import AdminUserController from "../controllers/AdminUserController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(adminMiddleware);

router.get("/", AdminUserController.list);
router.get("/:id", AdminUserController.show);
router.post("/", AdminUserController.create);
router.put("/:id", AdminUserController.update);
router.delete("/:id", AdminUserController.delete);

export default router;
