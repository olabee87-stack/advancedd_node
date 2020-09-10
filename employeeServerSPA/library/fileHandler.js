//function libary
"use strict";

const fs = require("fs");
const path = require("path");

//@Import mimetypes
const MIMETYPES = require("./mimetypes.json");

//@Read Function
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

//@optins: {encoding: 'utf8', flag: 'w'} - write json to disk
const write = (filepath, data, options) => {
  return new Promise(async (resolve, reject) => {
    try {
      await fs.promises.writeFile(filepath, data, options);
      resolve({ message: "OK" });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { read, write };
