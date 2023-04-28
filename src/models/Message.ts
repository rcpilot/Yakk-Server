import { model, Schema, Document } from "mongoose"
import { IChannel } from "./Channel"
import { IUser } from "./User"

export interface IMessage extends Document {
  message: string,
  user: IUser,
  channel: IChannel
}

const messageSchema: Schema = new Schema(
  {
    message: {
      type: String,
      reqired: [true, "Please provide a channel name"],
      index: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "USER MISSING"]
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
      required: [true, "CHANNEL MISSING"]
    }
  },
  {
    timestamps: true,
  }
)

export default model<IChannel>('Message', messageSchema)