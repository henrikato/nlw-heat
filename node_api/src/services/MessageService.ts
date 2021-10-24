import { Message, User } from ".prisma/client";
import { io } from "../app";
import { NEW_MESSAGE } from "../constants/SocketEvents";
import prismaClient from "../prisma"

class MessageService {
  async get () {
    let result = await prismaClient.message.findMany({
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: true
      }
    });

    return result;
  }

  async create (text: string, user_id: string) {
    let message = await prismaClient.message.create({
      data: { text, user_id },
      include: { user: true }
    });

    this.broadcast(message);

    return message;
  }

  broadcast (message: Message & { user: User }) {
    let socketPayload = {
      text: message.text,
      user_id: message.user.id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url
      }
    };

    io.emit(NEW_MESSAGE, socketPayload);
  }
}

export { MessageService }