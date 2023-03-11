import express from "express";
import { body } from "express-validator";
// import { errorHandler } from "../utils/errorHandler";
import loginController from "../controllers/auth/loginController.js";
import forgetPasswordController from "../controllers/auth/forgetPasswordController.js";
// import { isAuthenticated } from "../middlewares/isAuth.js";
import { errorHandler } from "../utils/errorHandler.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").normalizeEmail().isEmail().withMessage("Invalid Email"),
    body("password").isStrongPassword().withMessage("Invalid Password"),
  ],
  errorHandler,
  loginController
);

router.post(
  "/forget_password",
  [body("id").notEmpty().withMessage("Invalid id")],
  errorHandler,
  forgetPasswordController
);

export default router;
