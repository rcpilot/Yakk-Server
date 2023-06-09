import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";

import passport from 'passport';
import passportJWT from 'passport-jwt';
import { configurePassport } from './config/passport';

import { healthcheckRouter } from "./routes/healthcheck";
import { serverRouter } from "./routes/server";
import { channelRouter } from "./routes/channel";
import "./environment.d.ts";

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo:27017`,
    {
      dbName: "yakk",
    }
  )
  .then(
    (db) => {
      console.log("MongoDB connected!");
    },
    (err) => {
      console.log("MongoDb failed to connect!");
      console.log(err);
    }
  );

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", function (socket: any) {
  console.log(`Client connected [id=${socket.id}]`);
  socket.on("message", function (message: any) {
    console.log(message);
    socket.emit("message", message);
  });
});

app.use(express.json());

app.use(passport.initialize());
configurePassport(passport);

app.use("/api", healthcheckRouter);
app.use("/api/server", serverRouter);
app.use("/api/channel", channelRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to Yakk." });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
