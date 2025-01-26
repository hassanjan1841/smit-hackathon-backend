import express from "express";
const router = express.Router();
import {
  getAllSubCategories,
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategoryController.js";

router.get("/category/:categoryId", getAllSubCategories);
router.get("/:id", getSubCategory);

router.post("/", createSubCategory);
router.put("/:id", updateSubCategory);
router.delete("/:id", deleteSubCategory);

export default router;
