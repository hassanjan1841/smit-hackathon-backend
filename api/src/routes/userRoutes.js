import express from "express";
const router = express.Router();
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getCurrentUser,
} from "../controllers/userController.js";

router.get("/", getAllUsers);
router.post("/me", getCurrentUser);
router.get("/:id", getUser);

router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
