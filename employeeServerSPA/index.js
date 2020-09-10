"use strict";

const http = require("http");
const fs = require("fs");

const Datastorage = require("./dataStorage/dataStorageLayer");

const dataStorage = new Datastorage();

//Global logger - Creates a log file in the app
const output = fs.createWriteStream("./logfile.log"); //appears when you writeLog()
const { Console } = require("console");
global.writeLog = new Console({ stdout: output, stderr: output }).log; //everythig
//################

const port = process.env.PORT || 3006;

const host = process.env.HOST || "localhost";

const server = http.createServer(async (req, res) => {
  try {
    switch (req.method.toUpperCase()) {
      case "GET":
        // handleGetRequests(req, res);
        break;

      case "POST":
        // handlePostRequests(req, res);
        break;

      default:
        writeLog("Method not used ");
        res.end();
    }
  } catch (error) {
    writeLog(error.message);
    res.end();
  }
});

server.listen(port, host, () =>
  writeLog(`Server ${host} started on port ${port}`)
);
console.log(`Server ${host} started on port ${port}`);
