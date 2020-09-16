"use strict";

const mysql = require("mysql");

module.exports = class Database {
  constructor(options) {
    this.options = options;
  }
  doQuery(sql, parameters, connection) {
    return new Promise(async (resolve, reject) => {
      let newConnection = false;
      if (!connection) {
        connection = mysql.createConnection(this.options);
        newConnection = true;
      }
      let queryResult = connection.query(sql, parameters, (err, result) => {
        if (err) {
          reject(new Error("SQL-error:" + err.message));
        } else if (typeof result === "undefined") {
          reject(new Error("QueryError"));
        } else if (typeof result.affectedRows === "undefined") {
          resolve({
            queryResult: result,
            resultSet: true,
          });
          resolve(result);
        } else {
          resolve({
            queryResult: {
              rowsChanged: result.affectedRows,
              insertId: result.insertId,
              status: result.warningCount,
            },
            resultSet: false,
          });
        }
      });
      if (newConnection) connection.end(); //waits until query has finished
    });
  }
};
