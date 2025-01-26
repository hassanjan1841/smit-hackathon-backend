import sendResponse from "../helpers/sendResponse.js";
import { Category } from "../models/loanModel.js";

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return sendResponse(res, "Category already exists.", null, true, 400);
    }

    const category = await Category.create({ name });

    sendResponse(res, "Category created successfully", category, false, 201);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return sendResponse(res, "No categories found.", null, true, 404);
    }
    sendResponse(res, "Categories retrieved successfully", categories);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Get a specific category by ID
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return sendResponse(res, "Category not found.", null, true, 404);
    }
    sendResponse(res, "Category retrieved successfully", category);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Update a specific category's details
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();

    if (!updatedCategory) {
      return sendResponse(res, "Category not found.", null, true, 404);
    }

    sendResponse(res, "Category updated successfully", updatedCategory);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return sendResponse(res, "Category not found.", null, true, 404);
    }

    sendResponse(res, "Category deleted successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

export {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
