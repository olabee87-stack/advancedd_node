//function libary
"use strict";

const fs = require("fs");
const path = require("path");

const MIMETYPES = require("./mimetypes.json");

const read = (filepath) => {
  let extension = path.extname(filepath).toLowerCase();
  let mime = MIMETYPES[extension] || {
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
const sendJson = (res, jsonResource) => {
  let jsonData = JSON.stringify(jsonResource);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(jsonData);
};

const sendStatus = (res, message, statusCode = 200) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify({ message }));
};
const isIn = (route, ...routes) => {
  for (let start of routes) {
    if (route.startsWith(start)) return true;
  }
  return false;
};
const getPostData = (req, contentType) =>
  new Promise((resolve, reject) => {
    if (req.headers["content-type"] !== contentType) {
      reject("Wrong Content-Type");
    } else {
      let parse;
      if (contentType === "application/x-www-form-urlencoded") {
        parse = require("querystring").parse;
      } else if (contentType === "application/json") {
        parse = JSON.parse;
      }
      let databuffer = [];
      req.on("data", (messageFragment) => databuffer.push(messageFragment));
      req.on("end", () => resolve(parse(Buffer.concat(databuffer).toString())));
      req.on("error", () => reject("Error during the data transfer"));
    }
  });
const redirectError = (res, message) => {
  res.writeHead(303, { Location: `/error?message=${message}` });
  res.end();
};
module.exports = {
  read,
  send,
  sendJson,
  sendStatus,
  isIn,
  getPostData,
  redirectError,
};
