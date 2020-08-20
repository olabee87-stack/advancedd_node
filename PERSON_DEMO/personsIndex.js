"use strict";

const http = require("http");

const url = require("url");

const { get, getAll } = require("./persons.js");

// console.log(get("firstname", "Matt"));
// console.log(get("lastname", "River"));
// console.log(get());
// console.log(getAll());

const server = http.createServer((req, res) => {
  const urlData = url.parse(req.url, true);
  const route = urlData.pathname;
  console;
});
