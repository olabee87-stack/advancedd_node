"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3007;
const host = process.env.HOST || "localhost";

//get the content of home.html
const homeFilePath = path.join(__dirname, "home.html");

const server = http.createServer((req, res) => {
  //read from specified file
  fs.readFile(homeFilePath, "utf-8", (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end(err.message);
    } else {
      res.writeHead(200, {
        "Content-Type": "text/html",
        //imp when reading from file to get all length
        "Content-Length": Buffer.byteLength(data, "utf-8"),
      });
      res.end(data); //send data from file to browser
    }
  });
});

server.listen(port, host, () => {
  console.log(`Server ${host}  is listening on port ${port}`);
});
