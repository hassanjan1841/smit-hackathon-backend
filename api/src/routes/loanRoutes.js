import express from "express";
const router = express.Router();
import {
  getAllLoans,
  createLoan,
  getLoan,
  updateLoan,
  deleteLoan,
} from "../controllers/loanController.js";

router.get("/", getAllLoans);
router.get("/:id", getLoan);

router.post("/", createLoan);
router.put("/:id", updateLoan);
router.delete("/:id", deleteLoan);

export default router;
