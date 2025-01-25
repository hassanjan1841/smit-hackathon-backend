function sendResponse(res, message, data = null, error = false, status = 200) {
  res.status(status).json({
    message: message,
    data: data,
    error: error,
  });
}

export default sendResponse;
