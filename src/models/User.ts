import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  nick: string;
  user: string;
  uid: number;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema(
  {
    nick: {
      type: String,
      required: [true, "Please provide a nickname"],
      index: true,
    },
    user: {
      type: String,
      required: [true, "Please provide a username"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);