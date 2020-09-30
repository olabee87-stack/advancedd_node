"use strict";

const path = require("path");
const url = require("url");

const { send, sendJson, isIn } = require("../library/requestHandler");

const { read } = require("../library/fileHandler");

const resourcePaths = ["/favicon", "/styles/", "/images/", "/js/"];

//@webpages to serve
const webPages = {
  "/getAllPage": "getAll.html",
  "/getOnePage": "getOne.html",
  "/insertPage": "insert.html",
  "/deletePage": "delete.html",
  "/updatePage": "update.html",
};

module.exports = (baseDir, dataStorage) => {
  const menuPath = path.join(baseDir, "webPages", "menu.html");

  return async (req, res) => {
    const route = decodeURIComponent(url.parse(req.url).pathname);

    try {
      if (route === "/") {
        send(res, await read(menuPath));
      } else if (route === "/all") {
        const result = await dataStorage.getAll(); //prints the json to the browser
        sendJson(res, result);
      } else if (isIn(route, ...resourcePaths)) {
        const result = await read(path.join(baseDir, route));
        send(res, result);
      } else if (isIn(route, ...Object.keys(webPages))) {
        const result = await read(
          path.join(baseDir, "webPages", webPages[route])
        );
        send(res, result);
      } else {
        writeLog(`Get route ${route} not found`);
        res.end();
      }
    } catch (error) {
      writeLog("Not found: " + error.message);
      res.end();
    }
  };
};
