import express from "express";
import passport from "passport";
import ChannelController from "../controllers/channel";

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  ChannelController.create
);

export { router as channelRouter };
