import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);

export const ContactCollection = model("user", userSchema);
