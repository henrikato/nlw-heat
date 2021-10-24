import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

class MessageController {
  async post(request: Request, response: Response) {
    const service = new MessageService();

    let { message } = request.body;

    try {
      let result = await service.create(message, request.user_id);
  
      return response.json(result);
            
    } catch (error: any) {
      return response.status(422).json({ message: error.message })
    }
  }

  async get(request: Request, response: Response) {
    const service = new MessageService();

    try {
      let result = await service.get();

      return response.json(result);

    } catch (error: any) {
      return response.status(422).json({ message: error.message });
    }
  }
}

export { MessageController }