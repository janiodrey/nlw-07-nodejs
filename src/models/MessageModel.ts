import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const MessageModel = mongoose.model("Message", messageSchema);
