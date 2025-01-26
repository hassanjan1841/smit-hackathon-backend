import express from "express";
const router = express.Router();
import {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

router.get("/", getAllCategories);
router.get("/:id", getCategory);

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
