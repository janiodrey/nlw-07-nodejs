// import prismaClient from "../prisma";
import { UserModel } from "../models/UserModel";

class ProfileUserService {
  async execute(user_id: string) {
    const user = await UserModel.findOne({ _id: user_id });

    return user;
  }
}

export { ProfileUserService };
