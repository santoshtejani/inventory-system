import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

// Routes
import { productRoutes } from "./routes/proudct_route.js";

// Error Handler Middleware

const port = process.env.PORT || 8080;
dotenv.config();

const app = express();
app.use(express.json());

const db = process.env.MONGO_URI; // Replace with your MongoDB URL

// Serve static files from the React app's build directoryy
const buildPath = path.join(process.cwd(), "client", "build");
app.use(express.static(buildPath));

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/product", productRoutes);

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(process.cwd(), "client", "build");
  app.use(express.static(buildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

app.listen(port, () => console.log("Running on port " + port));