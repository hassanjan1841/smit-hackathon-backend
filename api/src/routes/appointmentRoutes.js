import express from "express";
const router = express.Router();
import {
  getAllAppointments,
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

router.get("/", getAllAppointments);
router.get("/:id", getAppointment);

router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
