"use strict";

const http = require("http");
const url = require("url");

const port = process.env.PORT || 3005;
const host = process.env.HOST || "localhost";

const server = http.createServer((req, res) => {
  const urlData = url.parse(req.url, true);
  console.log(urlData.query);
  const name = urlData.query.name;
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<h1>Hi ${name} !</h1>`);
});

server.listen(port, host, () => {
  console.log(`Server ${host} listening port ${port}`);
});
