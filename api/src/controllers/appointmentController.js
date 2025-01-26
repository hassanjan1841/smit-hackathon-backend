import Appointment from "../models/appointmentMode.js";



// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { date, time, category } = req.body;

    const appointment = await Appointment.create({ date, time, category });

    sendResponse(
      res,
      "Appointment created successfully",
      appointment,
      false,
      201
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    if (!appointments || appointments.length === 0) {
      return sendResponse(res, "No appointments found.", null, true, 404);
    }
    sendResponse(res, "Appointments retrieved successfully", appointments);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Get a specific appointment by ID
const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return sendResponse(res, "Appointment not found.", null, true, 404);
    }
    sendResponse(res, "Appointment retrieved successfully", appointment);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Update a specific appointment's details
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    ).exec();

    if (!updatedAppointment) {
      return sendResponse(res, "Appointment not found.", null, true, 404);
    }

    sendResponse(res, "Appointment updated successfully", updatedAppointment);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Delete an appointment by ID
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return sendResponse(res, "Appointment not found.", null, true, 404);
    }

    sendResponse(res, "Appointment deleted successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

export {
  createAppointment,
  getAllAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
};
