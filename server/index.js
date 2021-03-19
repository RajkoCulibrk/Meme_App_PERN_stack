import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
