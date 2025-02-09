import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import orderRoutes from "./routes/ordersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/usersRoute.js";

import { connectToDatabase } from "./config/mongodbConnection.js";

const PORT = 3000;
const app = express();

app.use(
  cors({
    origins: [
      "https://ecomdemo-eight.vercel.app/",
      "https://ecomdemo-eight.vercel.app",
      "http://localhost:5173/",
      "http://localhost:5173",
    ],
  })
);
app.use(express.json());  // allows us to parse incoming requests:req.body
app.use(cookieParser());  // allows us to parse incoming cookies

app.get("/", (req, res) => {
  res.status(200).json({ message: "server currently running" });
});

app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server running on PORT: ${PORT}`);
});
