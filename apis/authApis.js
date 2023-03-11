import express from "express";
import { body } from "express-validator";
import loginController from "../controllers/auth/loginController.js";
import forgetPasswordController from "../controllers/auth/forgetPasswordController.js";
import { isAuthenticated } from "../middlewares/isAuth.js";
import { errorHandler } from "../utils/errorHandler.js";
import signUpController from "../controllers/auth/signUpController.js";
import verifyTokenController from "../controllers/auth/verifyTokenController.js";
import verifyAndNewPasswordController from "../controllers/auth/verifyAndNewPasswordController.js";

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
  [body("email").notEmpty().isEmail().withMessage("Invalid email")],
  errorHandler,
  forgetPasswordController
);

router.post(
  "/sign_up",
  [
    body("name").notEmpty().withMessage("Invalid name"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isStrongPassword().withMessage("Weak password"),
  ],
  errorHandler,
  signUpController
);

router.post(
  "/verify_token",
  [body("token").notEmpty().withMessage("Invalid token")],
  errorHandler,
  verifyTokenController
);

router.post(
  "/verify_token_set_password",
  [
    body("token").notEmpty().withMessage("Invalid token"),
    body("newPassword").isStrongPassword().withMessage("Weak password"),
  ],
  errorHandler,
  verifyAndNewPasswordController
);

export default router;
