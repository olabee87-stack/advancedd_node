"use strict";
const person = require("./person.json");

const http = require("http");
const port = process.env.PORT || 3004;
const host = process.env.HOST || "localhost";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
  res.write(createHTML());
  res.end();
});

//Listening port
server.listen(port, host, () =>
  console.log(`Server  ${host} is listening on ${port}`)
);
const createHTML = () => {
  let htmlString = `<!DOCTYPE html>
      <html>
      <head>
      <meta charset="utf-8">
      <title>Person Date</title>
      </head>
      <body>
      <h1>Person</h1>
      `;

  let partB = ` <h2>${person.firstname} ${person.lastname}</h2>`;

  let partC = `
      </body>
      </html>`;
  return htmlString + partB + partC;
};
