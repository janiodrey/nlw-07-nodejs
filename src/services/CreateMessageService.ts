import { io } from "../app";
import { MessageModel } from "../models/MessageModel";

class CreateMessageService {
  async execute(text: string, user_id: string) {
    const newMessage = await MessageModel.create({
      text,
      user: user_id,
    });

    const message = await MessageModel.findOne({
      _id: newMessage._id,
    }).populate("user", "id name avatar_url");

    io.emit("new_message", message);

    return message;
  }
}

export { CreateMessageService };
