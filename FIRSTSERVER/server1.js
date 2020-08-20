"use strict";

const http = require("http");

//Express behind the scenes
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const server = http.createServer((req, res) => {
  // response.writeHead(200, { "Content-type": "text/plain; charset=utf8" });
  res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
  res.write("Hello");
  res.end();
  // response.end("Hello World!");
});

server.listen(port, host, () =>
  console.log(`Server  ${host} is listening on ${port}`)
);
