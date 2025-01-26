import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },

  deposit: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Loan = mongoose.models.Loan || mongoose.model("Loan", loanSchema);

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  maxLoanAmount: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
});

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
const SubCategory =
  mongoose.models.SubCategory ||
  mongoose.model("SubCategory", subCategorySchema);

export { Category, SubCategory, Loan };
