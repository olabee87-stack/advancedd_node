"use strict";

const path = require("path");
const url = require("url");

const { send, sendJson, isIn } = require("../library/requestHandler");

const { read } = require("../library/fileHandler");

const resourcePaths = ["/favicon", "/styles/", "/images/", "/js/"];

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
      } else {
        writeLog(`Get route ${route} not found`);
      }
    } catch (error) {
      writeLog("Not found: " + error.message);
    }
  };
};
