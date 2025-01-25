import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./src/routes/authRoutes.js";
import UserRoute from "./src/routes/userRoutes.js";
import { connectDB } from "./src/config/dbConnect.js";
import authenticateToken from "./src/middleware/authenticateToken.js";
connectDB();

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3002;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*", // Allow all origins, adjust as needed
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", AuthRoute);
app.use("/api/user", authenticateToken, UserRoute);
// testing
// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

// port listening

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

export default app;
