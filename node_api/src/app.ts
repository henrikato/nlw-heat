import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import express from 'express';
import { router } from "./routes";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket => {
  console.log(`Usuario conectado no socket ${socket.id}`);
});

app.use(express.json());

app.use(cors());
app.use(router);

app.get("/github", (_, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
});

app.get("/signin/callback", (req, res) => {
  let { code } = req.query;

  return res.json(code);
});

export { httpServer, io }