import { model, Schema, Document } from "mongoose"
import { IServer } from "./Server"

export interface IChannel extends Document {
  name: string,
  server: IServer
}

const channelSchema: Schema = new Schema(
  {
    name: {
      type: String,
      reqired: [true, "Please provide a channel name"],
      index: true
    },
    server: {
      type: Schema.Types.ObjectId,
      ref: "Server",
      required: [true, "SERVER MISSING"],
      index: true
    }
  },
  {
    timestamps: true,
  }
)

export default model<IChannel>('Channel', channelSchema)