import { httpServer } from "./app";

const port = process.env.PORT;
httpServer.listen(port, () => `Server rodando na porta ${port}`);