import express, { Request, Response } from "express";

const router = express.Router();

router.get("/healthcheck", (req: Request, res: Response) => {
  console.log("Healthcheck called.");
  res.status(200).json({ message: "Healthy" });
});

export { router as healthcheckRouter };
