import express from "express";
import { body } from "express-validator";

import signUpController from "../controllers/auth/signUpController.js";
import verifyTokenController from "../controllers/auth/verifyTokenController.js";
import {errorHandler} from "../utils/errorHandler.js"

const router = express.Router();

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

router.post("/verify_token", [body("token").notEmpty().withMessage("Invalid token")], errorHandler, verifyTokenController)

export default router;
