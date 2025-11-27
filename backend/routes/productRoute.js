import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  getSingleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js"; // Your multer config
import adminAuth from "../middleware/adminAuth.js"; // Import the auth middleware

const productRouter = express.Router();

// Protected route - requires authentication
productRouter.post(
  "/add",
  adminAuth, // Add this middleware BEFORE upload
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);

productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", getSingleProduct);
productRouter.get("/list", listProducts);

export default productRouter;
