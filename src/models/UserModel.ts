import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  avatar_url: String,
  login: String,
  id: Number,
  name: String,
});

export const UserModel = mongoose.model("User", userSchema);
