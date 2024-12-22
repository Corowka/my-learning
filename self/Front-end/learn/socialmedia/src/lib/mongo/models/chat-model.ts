import { model, models, Schema } from "mongoose"

const ChatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  creationDate: { type: Number, require: true },
  name: { type: String },
  type: { type: String, require: true }
})

export const Chat = models.Chat || model("Chat", ChatSchema)
