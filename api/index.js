import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./src/routes/authRoutes.js";
import UserRoute from "./src/routes/userRoutes.js";
import { connectDB } from "./src/config/dbConnect.js";
import authenticateToken from "./src/middleware/authenticateToken.js";
import EmailRoutes from "./src/routes/emailRoutes.js";
import CategoryRoutes from "./src/routes/categoryRoutes.js";
import SubCategoryRoutes from "./src/routes/subCategoryRoutes.js";
import LoanRoutes from "./src/routes/loanRoutes.js";
connectDB();

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3002;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure CORS to allow requests from localhost:5173
app.use(
  cors({
    origin: "*", // Allow only frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // You can specify other methods if needed
    allowedHeaders: ["Content-Type", "Authorization"], // Ensure to include the Authorization header if needed
  })
);

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", AuthRoute);
app.use("/api/user", authenticateToken, UserRoute);
app.use("/api/sendEmail", EmailRoutes);
app.use("/api/loan", LoanRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/subCategory/", SubCategoryRoutes);

// port listening
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

export default app;
