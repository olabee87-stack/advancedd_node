"use strict";

const Database = require("./database");

const db = new Database({
  host: "localhost",
  port: 3306,
  user: "zeke",
  password: "secret",
  database: "employeedb",
});

run();

//FUNCTION DEFINITIONS
//Print workers
function printWorkers(employees) {
  for (let person of employees) {
    console.log(
      `${person.employeeId} ${person.firstname} ${person.lastname} Dept: ${person.department}`
    );
  }
}

async function getAll() {
  try {
    const result = await db.doQuery("select * from employee");
    if (result.resultSet) {
      printWorkers(result.queryResult);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function get(employeeId) {
  try {
    const result = await db.doQuery("select * from employeeId=?", [employeeId]);
    printWorkers(result.queryResult);
  } catch (error) {
    console.log(error.message);
  }
}

async function run() {
  await getAll();
  console.log("#############");
  await get(136);
  await get(1);
}
