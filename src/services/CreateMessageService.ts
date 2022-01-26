import { io } from "../app";
import { MessageModel } from "../models/MessageModel";

class CreateMessageService {
  async execute(text: string, user_id: string) {
    const newMessage = await MessageModel.create({
      text,
      user_id,
    });

    const message = await MessageModel.findOne({ _id: newMessage._id }).populate(
      "user_id"
    );

    const infoWS = {
      text: message.text,
      user_id: message.user_id.id,
      created_at: message.created_at,
      user: {
        name: message.user_id.name,
        avatar_url: message.user_id.avatar_url,
      },
    };

    io.emit("new_message", infoWS); 
    console.log(infoWS);

    return newMessage;
  }
}

export { CreateMessageService };
