import express from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
  registerAdmin,
  logoutUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/admin", loginAdmin);
userRouter.post("/admin/register", registerAdmin); 

export default userRouter;
