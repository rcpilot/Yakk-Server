import express from "express";
import UserController from "../controllers/user";

const router = express.Router();

router.post("/login", UserController.login);

export { router as serverRouter };
