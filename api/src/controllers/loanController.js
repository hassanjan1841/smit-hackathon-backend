import sendResponse from "../helpers/sendResponse.js";
import { Loan } from "../models/loanModel.js";

// Create a new loan
const createLoan = async (req, res) => {
  try {
    const { initialDeposit, category, subcategory, email } = req.body;

    const existingLoan = await Loan.findOne({
      category,
      subcategory,
      email,
    });
    if (existingLoan) {
      return sendResponse(res, "Loan already exists.", null, true, 400);
    }

    const loan = await Loan.create({ ...req.body, deposit: initialDeposit });

    sendResponse(res, "Loan created successfully", loan, false, 201);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Get all loans
const getAllLoans = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status && status !== "undefined" ? { status: status } : {};
    const loans = await Loan.find(query)
      .populate("category")
      .populate("subcategory")
      .populate("user");
    if (!loans || loans.length === 0) {
      return sendResponse(res, "No loans found.", null, true, 404);
    }
    sendResponse(res, "Loans retrieved successfully", loans);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Get a specific loan by ID
const getLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findById(id);
    if (!loan) {
      return sendResponse(res, "Loan not found.", null, true, 404);
    }
    sendResponse(res, "Loan retrieved successfully", loan);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Update a specific loan's details
const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLoan = await Loan.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();

    if (!updatedLoan) {
      return sendResponse(res, "Loan not found.", null, true, 404);
    }

    sendResponse(res, "Loan updated successfully", updatedLoan);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Delete a loan by ID
const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLoan = await Loan.findByIdAndDelete(id);

    if (!deletedLoan) {
      return sendResponse(res, "Loan not found.", null, true, 404);
    }

    sendResponse(res, "Loan deleted successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

export { createLoan, getAllLoans, getLoan, updateLoan, deleteLoan };
