import express from "express";
import { body } from "express-validator";

import signUpController from "../controllers/auth/signUpController.js";
import bodyErrorHandler from "../utils/bodyErrorHandler.js";

const router = express.Router();

router.post(
  "/sign_up",
  [
    body("name").notEmpty().withMessage("Invalid name"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isStrongPassword().withMessage("Weak password"),
  ],
  bodyErrorHandler,
  signUpController
);

export default router;
