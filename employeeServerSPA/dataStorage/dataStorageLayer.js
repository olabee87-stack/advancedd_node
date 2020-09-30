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
      } else this.storage = JSON.parse(data); //convert object from buffer to json
    });
  }

  //@read whatever is in the storage file above
  async readStorage() {
    try {
      const data = await read(storageFile);
      this.storage = JSON.parse(data.fileData);
    } catch (err) {
      writeLog(err.message);
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
      writeLog(err.message);
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

//REFACTORED!!!!!!!!!!!!!!!!!!!!11

// 'use strict';

// const path = require('path');

// const storageConfig = require('./storageConfig');
// const storageFile = path.join(__dirname,storageConfig.storageFile);

// function createDataStorage(baseDir, config) {
//   const {
//     CODES,
//     MESSAGES
//   } = require(path.join(baseDir, config.errorCodeFolder, config.errorCodes));

//   const {
//     read,
//     write
//   } = require(path.join(baseDir, config.libraryFolder, config.fileHandler));

//   async function readStorage() {
//     try {
//       const data = await read(storageFile);
//       return Promise.resolve(JSON.parse(data.fileData));
//     } catch (err) {
//       writeLog(err.message);
//     }
//   }

//   async function writeStorage(data) {
//     try {
//       await write(storageFile, JSON.stringify(data, null, 4), {
//         encoding: 'utf8',
//         flag: 'w'
//       });
//     } catch (err) {
//       writeLog(err.message);
//     }
//   }

//   class Datastorage {

//     static get CODES() {
//       return CODES;
//     };

//     getAll() {
//       return new Promise(async resolve => {
//         let storage = await readStorage();
//         resolve(storage);
//       });
//     }

//     get(id) {
//       async function getFromStorage(id) {
//         let storage = await readStorage();
//         for (let employee of storage) {
//           if (employee.employeeId == +id) {
//             return employee;
//           }
//         }
//         return null;
//       }
//       return new Promise(async resolve => {
//         if (!id) {
//           resolve(MESSAGES.NOT_FOUND('<empty Id>'));
//         } else {
//           const result = await getFromStorage(id);
//           if (result) {
//             resolve(result);
//           } else {
//             resolve(MESSAGES.NOT_FOUND(id));
//           }
//         }
//       });
//     }

//     insert(employee) {
//       async function addToStorage(newEmployee) {
//         let storage = await readStorage();
//         for (let employee of storage) {
//           if (employee.employeeId == newEmployee.employeeId) {
//             return false;
//           }
//         }
//         storage.push(employee);
//         await writeStorage(storage);
//         return true;
//       }
//       return new Promise(async resolve => {
//         if (!(employee && employee.employeeId && employee.firstname && employee.lastname)) {
//           resolve(MESSAGES.NOT_INSERTED());
//         } else {
//           if (await addToStorage(employee)) {
//             resolve(MESSAGES.INSERT_OK(employee.employeeId));
//           } else {
//             resolve(MESSAGES.ALREADY_IN_USE(employee.employeeId));
//           }
//         }
//       });
//     }

//     remove(employeeId) {
//       async function deleteFromStorage(id) {
//         let storage = await readStorage();
//         for (let i = 0; i < storage.length; i++) {
//           if (storage[i].employeeId == +id) {
//             storage.splice(i, 1);
//             await writeStorage(storage);
//             return true;
//           }
//         }
//         return false;
//       }

//       return new Promise(async resolve => {
//         if (!employeeId) {
//           resolve(MESSAGES.NOT_FOUND('<empty>'));
//         } else {
//           if (await deleteFromStorage(employeeId)) {
//             resolve(MESSAGES.DELETE_OK(employeeId));
//           } else {
//             resolve(MESSAGES.NOT_DELETED());
//           }
//         }
//       });
//     }

//     update(employee) {
//       async function updateStorage(employee) {
//         let storage = await readStorage();
//         for (let i = 0; i < storage.length; i++) {
//           if (storage[i].employeeId == employee.employeeId) {
//             Object.assign(storage[i], employee);
//             await writeStorage(storage);
//             return true;
//           }
//         }
//         return false;
//       }
//       return new Promise(async resolve => {
//         if (!(employee && employee.employeeId && employee.firstname && employee.lastname)) {
//           resolve(MESSAGES.NOT_UPDATED());
//         } else {
//           if (await updateStorage(employee)) {
//             resolve(MESSAGES.UPDATE_OK(employee.employeeId));
//           } else {
//             resolve(MESSAGES.NOT_UPDATED());
//           }
//         }
//       });
//     }
// //task: add these two methods
//     getAllDepartments() {}

//     getDepartmentsEmployees(department) {}

//   };

//   return new Datastorage();
// };

// module.exports = {
//   createDataStorage
// }
