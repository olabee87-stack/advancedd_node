//SERVER TO SERVE IMAGES, JS, STYLES, etc

"use strict";
const http = require("http");
const url = require("url");
const path = require("path");

//Port
const port = process.env.PORT || 3010;
const host = process.env.HOST || "localhost";

//functions from the library
const { read, send, sendJSON, sendError, isIn } = require(path.join(
  __dirname,
  "library",
  "fileHandler.js"
));

//Paths to serve
const homePath = path.join(__dirname, "home.html");
const jsonPath = path.join(__dirname, "iceCream.json");
const resourceRoutes = ["/favicon", "/styles/", "/js/", "/images/"];

//Server
const server = http.createServer(async (req, res) => {
  let route = decodeURIComponent(url.parse(req.url, true).pathname);
  try {
    if (route === "/") {
      const result = await read(homePath);
      send(res, result);
    } else if (isIn(route, ...resourceRoutes)) {
      const result = await read(path.join(__dirname, route));
      send(res, result);
    } else if (route === "/all") {
      const data = await read(jsonPath);
      const iceCreams = JSON.parse(data.fileData);
      sendJSON(res, Object.keys(iceCreams));
    } else if (route.startsWith("/icecreams")) {
      const pathParts = route.split("/");

      if (pathParts.length > 2) {
        const iceCreamFlavor = pathParts[2];
        const data = await read(jsonPath);
        const iceCreams = JSON.parse(data.fileData);
        if (Object.keys(iceCreams).includes(iceCreamFlavor)) {
          sendJSON(res, iceCreams[iceCreamFlavor]);
        } else {
          sendError(res, "Icecream not found");
        }
      }
    } else {
      sendError(res, "Not found");
    }
  } catch (err) {
    sendError(res, err.message);
  }
});

//Listening port
server.listen(port, host, () =>
  console.log(`Server ${host} is running at the port ${port}.`)
);
