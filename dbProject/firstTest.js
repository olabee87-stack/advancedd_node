"use strict";

const MySQL = require("./database");

const options = {
  host: "localhost", //sql host
  port: 3306, //sqldb port
  user: "zeke",
  password: "secret", //never use password as a clear text
  database: "employeedb",
};

//Creating an instance of SQL db and taking the declared options as a parameter
const db = new MySQL(options);
// console.log("db", db.options);exite

(async () => {
  try {
    const result = await db.doQuery("select * from employee");
    if (result.resultSet) {
      for (let person of result.queryResult) {
        console.log(
          `${person.firstname} ${person.lastname} Dept: ${person.department}`
        );
      }
    }

    // const deleteResult = await db.doQuery('delete from employee where employeeId=?', [137])
    // console.log(deleteResult);

    const status = await db.doQuery("insert into employee values(?,?,?,?,?)", [
      138,
      "Will",
      "River",
      "admin",
      6000,
    ]);
    console.log(status);
  } catch (error) {
    console.log(error.message);
  }
})();
