"use strict";

const http = require("http");

//@ Can use in place of line 13 (another example)
// const path = require("path");
// const handleGetRequests = require(path.join(
//   __dirname,
//   "library', routeHandlerGet"
// ));

//@Require all libraries
//@ (__dirname) - passed here as a param defined in rhg.js and rhp.js as (basedir)
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

//JUST RANDOM

//@check computer info
// console.log(process);
// console.log(process.env);
// console.log(process.env.os);

//@check computer info keys/values only
// console.log(Object.keys(process.env));
// console.log(Object.values(process.env));
