import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export function Autorizacao (request: Request, response: Response, next: NextFunction) {
  let authToken = request.headers.authorization;

  if(!authToken) return Unauthorized(response);

  let [,token] = authToken.split(" ");

  try {
    let { sub } = verify(token, process.env.JWT_SECRET!) as JwtPayload;

    request.user_id = sub!;

    return next();
    
  } catch (error) {
    return Unauthorized(response, "Token expirado");
  }
}

function Unauthorized (response: Response, reason?: string) {
  return response.status(401).json({ message: reason || "Não Autorizado" });
}