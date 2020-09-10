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

  //@call from the insert statement below
  addToStorage(employee) {
    const result = this.getFromStorage(+employee.employeeId); //getfromstorage takes only the id
    if (result.length === 0) {
      this.storage.push(employee);
      return true;
    } else {
      return false;
    }
  }

  //@find one employee and remove where the id matches
  deleteFromStorage(id) {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i].employeeId == +id) {
        this.storage.splice(i, 1); //remove one element in this position
        return true;
      }
    }
    return false;
  }

  //@update employee if the id matches, else, return false
  updateStorage(employee) {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i].employeeId == +employee.employeeId) {
        Object.assign(this.storage[i], employee);
        return true;
      }
    }
    return false; //no employee with the given id
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
      const result = this.getFromStorage(id); //from line 43
      if (result.length > 0) {
        resolve(result);
      } else {
        resolve({ message: "not found" });
      }
    });
  }

  //@checks if employee exists or add a new one
  insert(employee) {
    return new Promise(async (resolve) => {
      await this.readStorage(); //read the storage -line 43
      if (this.addToStorage(employee)) {
        await this.writeStorage();
        resolve({ message: "Successfully inserted a field!" });
      } else {
        resolve({ message: "Employee already exists" });
      }
    });
  }

  //@delete an employee
  remove(employeeId) {
    return new Promise(async (resolve) => {
      await this.readStorage();
      if (this.deleteFromStorage(employeeId)) {
        await this.writeStorage();
        resolve({ message: "One entry deleted!" });
      } else {
        resolve({ message: "Unable to delete user" });
      }
    });
  }

  //@update employee
  update(employee) {
    return new Promise(async (resolve) => {
      await this.readStorage();
      if (this.updateStorage(employee)) {
        await this.writeStorage();
        resolve({ message: "Field successfully updated!" });
      } else {
        resolve({ message: "Could not update field!" });
      }
    });
  }
};
