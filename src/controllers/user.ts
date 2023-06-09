import { Response, Request } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginRequestBody {
  email: string;
  password: string;
}

const UserController = {
  getByEmail: async (email: string) => {
    return User.findOne({ email: email });
  },
  login: async (req: Request, res: Response, next: any) => {
    const { email, password } = req.body;
    const user = await UserController.getByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET);
      res.json({ token: token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  },
};

export default UserController;
