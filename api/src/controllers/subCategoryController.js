import sendResponse from "../helpers/sendResponse.js";
import { SubCategory } from "../models/loanModel.js";

// Create a new subcategory
const createSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    const existingSubCategory = await SubCategory.findOne({
      name,
      category,
    });
    if (existingSubCategory) {
      return sendResponse(res, "SubCategory already exists.", null, true, 400);
    }

    const subCategory = await SubCategory.create({
      name,
      category,
    });

    sendResponse(
      res,
      "SubCategory created successfully",
      subCategory,
      false,
      201
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Get all subcategories for a specific category
const getAllSubCategories = async (req, res) => {
  try {
    const { categoryId } = req.params;
    console.log(categoryId);
    const subCategories = await SubCategory.find({
      category: categoryId,
    }).populate("category");
    if (!subCategories || subCategories.length === 0) {
      return sendResponse(
        res,
        "No subcategories found for this category.",
        null,
        true,
        404
      );
    }
    if (!subCategories || subCategories.length === 0) {
      return sendResponse(
        res,
        "No subcategories found for this category.",
        null,
        true,
        404
      );
    }
    sendResponse(res, "SubCategories retrieved successfully", subCategories);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Get a specific subcategory by ID
const getSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.find({ category: id }).populate(
      "category"
    );
    console.log(subCategory);
    if (!subCategory) {
      return sendResponse(res, "SubCategory not found.", null, true, 404);
    }
    sendResponse(res, "SubCategory retrieved successfully", subCategory);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Update a specific subcategory's details
const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    ).exec();

    if (!updatedSubCategory) {
      return sendResponse(res, "SubCategory not found.", null, true, 404);
    }

    sendResponse(res, "SubCategory updated successfully", updatedSubCategory);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Delete a subcategory by ID
const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

    if (!deletedSubCategory) {
      return sendResponse(res, "SubCategory not found.", null, true, 404);
    }

    sendResponse(res, "SubCategory deleted successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

export {
  createSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
