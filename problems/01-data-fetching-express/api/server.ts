import jsonServer from "json-server";
import { resolve } from "path";
import { parse } from "url";

const PORT = 3000;
const server = jsonServer.create();
const router = jsonServer.router(resolve(__dirname, "./db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Middleware: Return single object
server.use((req, res, next) => {
  const _send = res.send;
  res.send = function (body) {
    if (parse(req.originalUrl, true).query["singular"]) {
      try {
        const json = JSON.parse(body);
        if (Array.isArray(json)) {
          if (json.length === 1) {
            return _send.call(this, JSON.stringify(json[0], null, 2));
          } else if (json.length === 0) {
            return res.sendStatus(404);
          }
        }
      } catch (e) {}
    }
    return _send.call(this, body);
  };
  next();
});

server.use(
  "/api",
  jsonServer.rewriter({
    "/companies": "/companies",
    "/companies/:companyId": "/companies?id=:companyId&singular=1",
    "/companies/:companyId/users": "/users?companyId=:companyId",
    "/companies/:companyId/users/:userId":
      "/users?companyId=:companyId&id=:userId&singular=1",
    "/companies/:companyId/users/:userId/cards": "/cards?userId=:userId",
    "/currency": "/currency",
  })
);
server.use("/api", router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on Port ${PORT}...`);
});
