import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  async getById(request: Request, response: Response) {
    const service = new UserService();

    try {
      let { user_id: id } = request;
      if(!id) return response.status(422).json({ message: "User ID invalido" })

      let result = await service.getById(id);
  
      return response.json(result);

    } catch (error: any) {
      return response.status(422).json({ message: error.message });
    }
  }
}

export { UserController }