"use strict";

const { read, write } = require("../library/fileHandler");

const fs = require("fs");
const path = require("path");

const storageFile = path.join(__dirname, "employees.json"); //read and write to

//@ convert object into readable file, if file is found
module.exports = class Datastorage {
  constructor() {
    fs.readFile(storageFile, (err, data) => {
      if (err) {
        this.storage = {};
      } else this.storage = JSON.parse(data);
    });
  }

  //@read whatever is in the storage file above
  async readStorage() {
    try {
      const data = await read(storageFile);
      this.storage = JSON.parse(data.fileData);
    } catch (err) {
      // writeLog(err.message)
    }
  }

  //@ write back into the storage
  async writeStorage() {
    try {
      await write(storageFile, JSON.stringify(this.storage, null, 4), {
        encoding: "utf-8",
        flag: "w",
      });
    } catch (err) {
      // writeLog(err.message)
    }
  }

  //@get from storage - return employee if it finds same within the array
  getFromStorage(id) {
    for (let employee of this.storage) {
      if (employee.employeeId == +id) {
        return [employee];
      }
    }
    return [];
  }

  //@'public' API
  getAll() {
    return new Promise(async (resolve) => {
      await this.readStorage();
      resolve(this.storage);
    });
  }

  get(id) {
    return new Promise(async (resolve) => {
      await this.readStorage();
      const result = this.getFromStorage(id);
      if (result.length > 0) {
        resolve(result);
      } else {
        resolve({ message: "not found" });
      }
    });
  }
};
