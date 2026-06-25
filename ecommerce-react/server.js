import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jsonServer from "json-server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const indexFile = path.join(distDir, "index.html");
const databaseFile = path.join(__dirname, "db.json");

const server = jsonServer.create();
const router = jsonServer.router(databaseFile);
const middlewares = jsonServer.defaults({
  static: distDir,
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  const isGetRequest = req.method === "GET";
  const isApiRoute =
    req.path.startsWith("/orders") || req.path.startsWith("/contacts");
  const hasFileExtension = path.extname(req.path) !== "";

  if (isGetRequest && !isApiRoute && !hasFileExtension && fs.existsSync(indexFile)) {
    return res.sendFile(indexFile);
  }

  return next();
});

server.use(router);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
