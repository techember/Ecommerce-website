import express from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
  registerAdmin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);
userRouter.post("/admin/register", registerAdmin); 

export default userRouter;
