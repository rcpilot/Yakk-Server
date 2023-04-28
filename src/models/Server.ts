import { model, Schema, Document } from "mongoose"

export interface IServer extends Document {
  name: string
}

const serverSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a server name"],
      index: true
    }
  },
  {
    timestamps: true,
  }
)

export default model<IServer>('Server', serverSchema)