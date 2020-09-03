"use strict";
const path = require("path");
const url = require("url");

//@ import all handers
const { read, send, sendJson, isIn, redirectError } = require("./handler.js");

//@webPages url
//@ baseDir - param to on to index.js (__dirname) / dir of the index.js
module.exports = (baseDir) => {
  const config = require(path.join(baseDir, "config.json")); //example with config
  const get = require(path.join(baseDir, "carstorage", "carstorage.js"));
  const menuPath = path.join(baseDir, "webPages", "menu.html");
  const errPath = path.join(baseDir, "webPages", "errorPage.html");
  const formPath = path.join(baseDir, "webPages", "form.html");

  //@paths to serve
  const resourcePaths = ["/favicon", "/styles/", "/images/", "/js/"];
  const webPagePaths = ["/webPages/"];

  return async (req, res) => {
    const route = decodeURIComponent(url.parse(req.url).pathname);
    try {
      if (route === "/") {
        let result = await read(menuPath);
        send(res, result);
      } else if (route === "/form") {
        let result = await read(formPath);
        result.fileData = result.fileData.replace("**MODEL**", "");
        result.fileData = result.fileData.replace("**LICENCE**", "");
        send(res, result);
      } else if (isIn(route, ...webPagePaths, ...resourcePaths)) {
        let result = await read(path.join(baseDir, route));
        send(res, result);
      } else if (route === "/getAll") {
        const cars = await get();
        sendJson(res, cars);
      } else if (route === "/error") {
        const message = url.parse(req.url, true).query.message;
        const result = await read(errPath);
        result.fileData = result.fileData.replace("**MESSAGE**", message);
        send(res, result);
      } else {
        redirectError(res, "Resource not found");
      }
    } catch (err) {
      redirectError(res, "Not found");
    }
  };
};

//@example with config
//const menuPath = path.join(baseDir, config.WEBPAGES, config.MENU);
//const webPagePaths = [`/${config.WEBPAGES}/`];
