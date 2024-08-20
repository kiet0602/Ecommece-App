import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
/* Route API users */
import authRoutes from "./routes/authRoute.js"; // routes
/* Route API category */
import categoryRoute from "./routes/categoryRoute.js";
import cors from "cors"; // cors
/* Route API Product */
import productRoute from "./routes/productRoute.js";

// configure env
dotenv.config(); // Có .env

// databse config
connectDB();

// rest objects
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
/* http://localhost:8080/api/v1/auth */
app.use("/api/v1/auth", authRoutes);
/* http://localhost:8080/api/v1/category */
app.use("/api/v1/category", categoryRoute);
/* http://localhost:8080/api/v1/products */
app.use("/api/v1/products", productRoute);

// rest api
app.get("/", (req, res) => {
  res.send("<h1> Welcome to ecommerce app MERN </h1>");
});

//PORT
const PORT = process.env.PORT || 8080; // Có .env

//run listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
