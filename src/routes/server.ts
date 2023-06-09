import express from "express";
import passport from "passport";
import ServerController from "../controllers/server";

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  ServerController.create
);

export { router as serverRouter };
