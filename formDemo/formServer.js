"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const qs = require("querystring");


const port = process.env.PORT || 3006;
const host = process.env.HOST || "localhost";

const formPath = path.join(__dirname, "form.html");

const server = http.createServer((req, res) => {
  if (req.method.toUpperCase() === "GET") {
    fs.readFile(formPath, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end(err.message);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/html;charset=utf-8",
          "Content-Length": Buffer.byteLength(data, "utf-8"),
        });
        res.end(data);
      }
    });
  } else if (req.method.toUpperCase() === "POST") {
    if (req.headers["content-type"] != "application/x-www-form-urlencoded") {
      res.statusCode = 404;
      res.end("error");
    } else {
      const databuffer = [];
      req.on("data", (messageFragment) => databuffer.push(messageFragment)); //get full data
      req.on("end", () => {
        let tempdata = qs.parse(Buffer.concat(databuffer).toString()); //do this after getting the full data
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(tempdata));
      });
      req.on("error", (err) => console.log("Error:" + err.message));
    }
  } //end of the post request
});

server.listen(port, host, () => {
  console.log(`Server ${host} listening on port${port}`);
});
