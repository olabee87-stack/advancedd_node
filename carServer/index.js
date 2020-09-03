"use strict";

const http = require("http");

//Require all libraries
const handleGetRequests = require("./library/routeHandlerGet.js")(__dirname);
const handlePostRequests = require("./library/routeHandlerPost.js")(__dirname);
const { redirectError } = require("./library/handler.js");

//@Port definition
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

//@Server creation
const server = http.createServer(async (req, res) => {
  if (req.method.toUpperCase() === "GET") {
    handleGetRequests(req, res);
  } else if (req.method.toUpperCase() === "POST") {
    handlePostRequests(req, res);
  } else {
    redirectError(res, "Resource not in use");
  }
});

//@Listening port
server.listen(port, host, () =>
  console.log(`Server ${host} listens port ${port}`)
);
