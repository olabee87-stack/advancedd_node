"use strict";

const http = require("http");

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-type": "text/plain; charset=utf8" });
  response.end("Hello World!");
});

server.listen(port, host, () =>
  console.log(`Server  ${host} is listening on ${port}`)
);
