import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  avatar_url: String,
  login: String,
  id: Number,
  name: String,
});

export const User = mongoose.model("User", userSchema);
