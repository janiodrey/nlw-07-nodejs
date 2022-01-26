import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const MessageModel = mongoose.model("Message", messageSchema);
