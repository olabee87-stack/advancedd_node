"use strict";

const MariaDB = require("./database");

const options = {
  host: "localhost", //Mariadb host
  port: 3306, //Mariadb port
  user: "zeke",
  password: "secret", //never use password as a clear text
  database: "employeedb",
};

//Creating an instance of Maria db and taking the declared options as a parameter
const db = new MariaDB(options);
// console.log("db", db.options);

(async () => {
  try {
    const result = await db.doQuery("select * from employee");
    if (result.resutSet) {
      for (let person of result.queryResult) {
        console.log(
          `${person.firstname} ${person.lastname} Dept: ${person.department}`
        );
      }
    }

    // const deleteResult = await db.doQuery('delete from employee where employeeId=?', [137])
    // console.log(deleteResult);

    const status = await db.doQuery("insert into employee values(?,?,?,?,?)", [
      136,
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
