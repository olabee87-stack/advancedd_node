"use strict";
const http = require("http");
const handleGetRequests = require("./library/routeHandlerGet.js")(__dirname);
const handlePostRequests = require("./library/routeHandlerPost.js")(__dirname);
const { redirectError } = require("./library/handler.js");
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const server = http.createServer(async (req, res) => {
  if (req.method.toUpperCase() === "GET") {
    handleGetRequests(req, res);
  } else if (req.method.toUpperCase() === "POST") {
    handlePostRequests(req, res);
  } else {
    redirectError(res, "Resource not in use");
  }
});
server.listen(port, host, () =>
  console.log(`Server ${host} listens port ${port}`)
);
