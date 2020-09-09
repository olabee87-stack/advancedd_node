"use strict";
const mysql = require("mysql");
const DatabaseSuper = require("./database");
module.exports = class TransactionDatabase extends DatabaseSuper {
  constructor(options) {
    super(options);
  }
  //The format of sqlStatementsInArray is:
  // [
  // {sql:statement, parameters:[]},
  // ...,
  // {sql:statement, parameters:[]}
  // ]
  doTransaction(sqlStatementsInArray) {
    return new Promise(async (resolve, reject) => {
      let connection;
      try {
        connection = await mysql.createConnection(this.options);
        await connection.beginTransaction();
        let results = [];
        for (let query of sqlStatementsInArray) {
          results.push(
            await this.doQuery(query.sql, query.parameters, connection)
          );
        }
        await connection.commit();
        resolve(results);
      } catch (err) {
        if (connection) connection.rollback();
        reject(new Error("Rollback, SQL-error:" + err.message));
      } finally {
        if (connection) connection.end();
      }
    });
  }
};
