import express from "express";
import testServer from "../controllers/dummy/testController.js";
const router = express.Router();

//test api
router.get("/", testServer);

export default router;
