"use strict";

const Database = require("./database");

const getAllSql =
  "select employeeId, firstname, lastname, department, salary from employee";

const getSql =
  "select employeeId, firstname, lastname, department, salary from employee where employeeId=?";

const insertSql =
  "insert into employee(employeeId, firstname, lastname, department, salary) values(?,?,?,?,?)";

const updateSql =
  "update employee set firstname=?, lastname=?, department=?, salary=? where employeeId=?";

const removeSql = "delete from employee where employeeId=?";

module.exports = class EmployeeDb {
  constructor(
    options = {
      host: "localhost",
      port: 3306,
      user: "zeke",
      password: "secret",
      database: "employeedb",
    }
  ) {
    this.db = new Database(options);
  }

  //@get all employees
  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getAllSql);
        console.log(result);
        if (result.resultSet) {
          resolve(result.queryResult); //return reuslt set from db.js
        } else {
          reject(new Error("Something went wrong..."));
        }
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }

  //@ get a single employee from the table
  get(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getSql, [+id]);
        if (result.resultSet) {
          if (result.queryResult.length > 0) {
            resolve(result.queryResult[0]);
          } else {
            resolve({});
          }
        } else {
          reject(new Error("Something went wrong.."));
        }
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }

  //@insert into Table
  insert(newObject) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(
          insertSql,
          Object.values(newObject)
        );
        if (result.queryResult.rowsChanged == 1) {
          resolve("insert OK");
        } else {
          reject("not inserted");
        }
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }

  //@updateDB
  update(updatedObject) {
    return new Promise(async (resolve, reject) => {
      try {
        let [first, ...rest] = Object.values(updatedObject);
        let params = [...rest, first];
        const result = await this.db.doQuery(updateSql, params);
        if (result.queryResult.rowsChanged == 1) {
          resolve("Update OK");
        } else {
          reject("Unable to update");
        }
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }

  //@ delete entry
  remove(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(removeSql, [+id]);
        if (result.queryResult.rowsChanged == 1) {
          resolve("Delete OK");
        } else {
          reject("Unable to delete...");
        }
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }
};
