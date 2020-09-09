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

function printWorkers(employees) {
  for (let person of employees) {
    const department = person.department
      ? `department is ${person.department}`
      : "no department specified";
    console.log(
      `${person.employeeId}: ${person.firstname} ${person.lastname}, ` +
        `${department}, salary is ${person.salary} €`
    );
  }
}
async function getAll() {
  try {
    const result = await db.doQuery("select * from employee");
    if (result.resultSet) {
      printWorkers(result.queryResult);
    }
  } catch (err) {
    console.log(err.message);
  }
}
async function get(employeeId) {
  try {
    const result = await db.doQuery(
      "select * from employee where employeeId=?",
      [employeeId]
    );
    printWorkers(result.queryResult);
  } catch (err) {
    console.log(err.message);
  }
}

async function add(person) {
  try {
    const parameters = [
      person.employeeId,
      person.firstname,
      person.lastname,
      person.department,
      person.salary,
    ];
    const sql = "insert into employee values(?,?,?,?,?)";
    const status = await db.doQuery(sql, parameters);
    console.log("Status:", status);
  } catch (err) {
    console.log(err.message);
  }
}
async function remove(id) {
  try {
    const status = await db.doQuery("delete from employee where employeeId=?", [
      id,
    ]);
    console.log("Remove status:", status);
  } catch (err) {
    console.log(err.message);
  }
}
//We assume that employeeId doesn't change, so it is used in the criterion
async function update(person) {
  const sql =
    "update employee set firstname=?, lastname=?, " +
    "department=?, salary=? where employeeId=?";
  try {
    const parameters = [
      person.firstname,
      person.lastname,
      person.department,
      person.salary,
      person.employeeId,
    ];
    const status = await db.doQuery(sql, parameters);
    console.log("Change status:", status);
  } catch (err) {
    console.log(err.message);
  }
}

//main function
async function run() {
  await getAll();
  console.log("######");
  await get(1);
  await add({
    employeeId: 100,
    firstname: "Anna",
    lastname: "Rodriguez",
    department: "ict",
    salary: 3500,
  });
  await getAll();
  await update({
    employeeId: 100,
    firstname: "Annax",
    lastname: "Rodriguezx",
    department: "ictx",
    salary: 3500.99,
  });
  await getAll();
  await remove(100);
  await getAll();
}
