import express from "express";
import AdminRoomController from "../controllers/AdminRoomController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(adminMiddleware);

router.get("/", AdminRoomController.list);
router.get("/:id", AdminRoomController.show);
router.post("/", AdminRoomController.create);
router.put("/:id", AdminRoomController.update);
router.delete("/:id", AdminRoomController.delete);

export default router;
