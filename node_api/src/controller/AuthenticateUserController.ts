import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const service = new AuthenticateUserService();

    let { code } = request.body;

    return service.execute(code)
      .then(data => response.json(data))
      .catch(err => response.status(401).json({ mensagem: err.message }));
  }
}

export { AuthenticateUserController }