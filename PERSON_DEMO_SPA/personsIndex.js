"use strict";

const http = require("http");
const url = require("url");

const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3009;
const host = process.env.HOST || "localhost";

const { get, getAll } = require("./persons.js");
const homePath = path.join(__dirname, "home.html");
// console.log(get("firstname", "Matt"));
// console.log(get("lastname", "River"));
// console.log(get());
// console.log(getAll());

const server = http.createServer((req, res) => {
  const urlData = url.parse(req.url, true);
  const name = urlData.query.name;
  const route = decodeURIComponent(urlData.pathname.toLowerCase());

  let result = [];

  if (route === "/") {
    fs.readFile(homePath, "utf-8", (err, data) => {
      if (err) {
        res.setStatus = 404;
        res.end(err.message); //for debugging
      } else {
        res.writeHead(200, {
          "Content-type": "text/html",
          "Content-Length": Buffer.byteLength(data, "UTF8"),
        });
        res.end(data);
      }
    });
  } else {
    if (route === "/persons") {
      result = getAll();
    } else if (route === "/persons/firstname") {
      result = get("firstname", name);
    } else if (route === "/persons/lastname") {
      result = get("lastname", name);
    } else if (route === "/persons/age") {
      result = get("age", +name);
    } else {
      result = { message: "key not found" };
    }
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(result));
  }
});

server.listen(port, host, () => {
  console.log(`Server ${host} listening on port${port}`);
});
