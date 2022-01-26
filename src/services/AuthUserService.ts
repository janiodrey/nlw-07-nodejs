import axios from "axios";
import { UserModel } from "../models/UserModel";
import { sign } from "jsonwebtoken";

/**
 * Receber code(string)
 * Recuperar o access_token no github
 * Recuperar infos do user no github
 * Verificar se o user existe no DB
 * ---- SIM = Gera um token
 * ---- NÃO = Cria no DB, gera um token
 * Retornar o token com as infos do user
 */

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      });

    const response = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    const { login, id, avatar_url, name } = response.data;

    let user = await UserModel.findOne({ id });

    if (!user) {
      user = await new UserModel({ login, id, avatar_url, name }).save();
    }
    
    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user._id.toString(),
        expiresIn: "1d",
      }
    );

    return { token, user };
  }
}

export { AuthUserService };
