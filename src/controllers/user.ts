import { Response, Request } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction } from "connect";

interface LoginRequestBody {
  email: string;
  password: string;
}

interface RegistrationRequestBody {
  username: string;
  email: string;
  password: string;
}

const UserController = {
  getByEmail: async (email: string) => {
    return User.findOne({ email: email });
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as LoginRequestBody;
    const user = await UserController.getByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, process.env.PASSPORT_SECRET);
      return res.json({ token: token });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  },
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body as RegistrationRequestBody;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already registered with that email address" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const currentIds = await User.collection.distinct("uniqueId", {
      username: username,
    });
    if (currentIds.length == 9999) {
      return res
        .status(409)
        .json({ message: "Too many users with this username" });
    }

    const availableIds = [];
    for (let i = 1; i < 9999; i++) {
      let id = String(i).padStart(4, "0");
      if (!currentIds.includes(id)) {
        availableIds.push(id);
      }
    }

    const uniqueId =
      availableIds[Math.floor(Math.random() * availableIds.length)];

    const user: IUser = new User({
      username: username,
      uniqueId: uniqueId,
      email: email,
      password: passwordHash,
      nick: username,
    });

    try {
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (err) {
      next(err);
    }
  },
};

export default UserController;
