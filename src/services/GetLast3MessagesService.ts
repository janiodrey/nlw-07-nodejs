import { MessageModel } from "../models/MessageModel";

class GetLast3MessagesService {
  async execute() {
    const messages = await MessageModel.find({}).limit(3);

    return messages;
  }
}

export { GetLast3MessagesService };
