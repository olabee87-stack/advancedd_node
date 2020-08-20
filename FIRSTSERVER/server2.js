"use strict";

const person = require("./person.json"); //json file to use
const http = require("http");

//Express behind the scenes
const port = process.env.PORT || 3001;
const host = process.env.HOST || "127.0.0.1"; //localhost

//Returning JSON
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  res.end(JSON.stringify(person));
});

server.listen(port, host, () =>
  console.log(`Server  ${host} is listening on ${port}`)
);
