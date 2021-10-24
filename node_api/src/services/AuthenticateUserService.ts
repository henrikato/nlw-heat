import axios from "axios";
import { sign } from "jsonwebtoken";
import { IGithubAuth } from "../interfaces/IGithubAuth";
import { IGithubUser } from "../interfaces/IGithubUser";
import prismaClient from "../prisma";

class AuthenticateUserService {
  async execute (code: string) {
    
    const { data } = await axios.post<IGithubAuth>("https://github.com/login/oauth/access_token", null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        "Accept": "application/json"
      }
    });

    const response = await axios.get<IGithubUser>("htps://api.github.com/user", {
      headers: {
        "Authorization": `Bearer ${data.access_token}`
      }
    });

    let { login, id, avatar_url, name } = response.data;


    let user = await prismaClient.user.findFirst({
      where: { github_id: id }
    });

    if(!user){
      user = await prismaClient.user.create({
        data: { github_id: id, login, avatar_url, name }
      })
    }

    let token = sign({
      user: {
        name: user.name,
        avatar_url: user.avatar_url,
        id: user.id,
      }
    },
    process.env.JWT_SECRET!,
    {
      subject: user.id,
      expiresIn: "1 day"
    })

    return { token, user };
  }
}

export { AuthenticateUserService }