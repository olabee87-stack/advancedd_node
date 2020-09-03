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

//Get the entire table function
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

//get specific employee
async function get(employeeId) {
  try {
    const result = await db.doQuery("select * from employeeId=?", [employeeId]);
    printWorkers(result.queryResult);
  } catch (error) {
    console.log(error.message);
  }
}

//Add function
// async function add(person) {
//   try {
//     const parameters = [
//       person.employeeId,
//       person.firstname,
//       person.lastname,
//       person.department,
//       person.salary,
//     ];

//     const sql ='insert into employee values(?,?,?,?,?)';

// const status = await db.doQuery(sql, parameters);
// console.log('Status:', status);

// } catch(err) {
//     console.log(err.message);
//   }
// }

//Update function
async function update(person) {
    try {
      const parameters = [

        person.firstname,
        person.lastname,
        person.department,
        person.salary,
        person.employeeId,
      ];

      const sql ="update employee set firstname=?, lastname=?, department=?, salary=? where employeeId=?",

//   const status = await db.doQuery(sql, parameters);
//   console.log('Update', status);

    } catch (error) {
      console.log(error.message);
    }
  }

// async function remove(employeeId) {
// try {
//     const status = await db.doQuery('delete from employeeId where employeeId=?', [employeeId]);
//     console.log('remove status:', status )
// } catch (error) {
//     console.log(error.message)
// }
// }

async function run() {
  await getAll();
  console.log("#############");
  //   await get(136);
  //   await get(1);
  //   await add({
  //     employeeId: 200,
  //     firstname: "Mary",
  //     lastname: "Jones",
  //     department: "secr",
  //     salary: 9999.99,
  //   });
  //   await getAll();
  //   await remove(200);
  //   await getAll();
    await update({
      employeeId: 3,
      firstname: "Mary",
      lastname: "Jones",
      department: "secr",
      salary: 9999.99,
    });
    await getAll();
}
