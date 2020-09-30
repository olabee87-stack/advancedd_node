"use strict";

const mysql = require("mysql");

module.exports = class Database {
  constructor(options) {
    this.options = options;
  }

  doQuery(sql, parameters, connection) {
    return new Promise(async (resolve, reject) => {
      let newConnection = false; //for transactions
      //create new connection if connection is missing
      if (!connection) {
        connection = mysql.createConnection(this.options);
        newConnection = true; //specifying that the connection is new
      }
      try {
        let queryResult = await connection.query(sql, parameters); //if conn line 15 is not created, throws an error
        if (typeof queryResult === "undefined") {
          reject(new Error("QueryError"));
        } else if (typeof queryResult.affectedRows === "undefined") {
          //resultset of the select query
          delete queryResult.meta; //remove irrelevant info from object and return only your relevant data
          resolve({ queryResult, resultSet: true }); //object returns a result set if true
        } else {
          resolve({
            queryResult: {
              rowsChanged: queryResult.affectedRows,
              insertId: queryResult.insertId,
              status: queryResult.warningStatus,
            },
            resultSet: false,
          });
        }
      } catch (error) {
        reject(new Error("SQL-error:" + error.message));
      } finally {
        if (connection && newConnection) connection.end(); //closes the connection
      }
    });
  }
};

// const mysql = require("mysql");

// module.exports = class Database {
//   constructor(options) {
//     this.options = options;
//   }
//   doQuery(sql, parameters, connection) {
//     return new Promise(async (resolve, reject) => {
//       let newConnection = false;
//       if (!connection) {
//         connection = mysql.createConnection(this.options);
//         newConnection = true;
//       }
//  try {
//       let queryResult = connection.query(sql, parameters, (err, result) => {
//         if (err) {
//           reject(new Error("BISI SQL-error:" + err.message));
//         } else if (typeof result === "undefined") {
//           reject(new Error("QueryError"));
//         } else if (typeof result.affectedRows === "undefined") {
//           resolve({
//             queryResult: result,
//             resultSet: true,
//           });
//           resolve(result);
//         } else {
//           resolve({
//             queryResult: {
//               rowsChanged: result.affectedRows,
//               insertId: result.insertId,
//               status: result.warningCount,
//             },
//             resultSet: false,
//           });
//         }
// }
// catch (error) {
//   reject(new Error("SQL-error:" + error.message));
// } finally {
//   if (connection && newConnection) connection.end(); //closes the connection
// }
//       });
//       if (newConnection) connection.end(); //waits until query has finished
//     });
//   }
// };
