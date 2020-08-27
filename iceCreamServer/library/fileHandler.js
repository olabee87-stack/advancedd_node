//function libary
"use strict";

const fs = require("fs");
const path = require("path");

const MIMETYPES = {
  ".html": { type: "text/html", encoding: "utf-8" },
  ".js": { type: "text/javascript", encoding: "utf-8" },
  ".css": { type: "text/css", encoding: "utf-8" },
  ".json": { type: "application/json", encoding: "utf-8" },
  ".png": { type: "image/png", encoding: "binary" },
  ".jpg": { type: "image/jpg", encoding: "binary" },
  ".gif": { type: "image/gif", encoding: "binary" },
  ".ico": { type: "image/vnd.microsoft.icon", encoding: "binary" },
};

//READ FUNCTION
const read = (filepath) => {
  let extension = path.extname(filepath).toLowerCase();
  //read each object in the mime
  //the type allows for download
  let mime = MIMETYPES[extension] || {
    //default is octet-stream mime is non-existent
    type: "application/octet-stream",
    encoding: "binary",
  };
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, mime.encoding, (err, fileData) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fileData, mime });
      }
    });
  });
};

//SEND FUNCTION
const send = (res, resource) => {
  res.writeHead(200, {
    "Content-Type": resource.mime.type,
    "Content-Length": Buffer.byteLength(
      resource.fileData,
      resource.mime.encoding
    ),
  });
  res.end(resource.fileData, resource.mime.encoding);
};

//SEND JSON FUNCTION
const sendJSON = (res, jsonResource) => {
  let jsonData = JSON.stringify(jsonResource);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(jsonData);
};

//SEND ERROR FUNCTION
const sendError = (res, message) => {
  res.writeHead(404, { "Content-Type": "application/json; charset=utf8" });
  res.end(JSON.stringify({ message }));
};

//Checks the values in a set of routes
const isIn = (route, ...routes) => {
  for (let start of routes) {
    if (route.startsWith(start)) return true;
  }
  return false;
};

module.exports = { read, send, sendJSON, sendError, isIn };

//COPIED
