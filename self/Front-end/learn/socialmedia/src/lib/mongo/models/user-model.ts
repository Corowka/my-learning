import { model, models, Schema } from "mongoose"

const UserSchema = new Schema({
  username: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
})

export const User = models.User || model("User", UserSchema)
