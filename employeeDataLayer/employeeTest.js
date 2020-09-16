"use strict";

const DataLayer = require("./dataStorageLayer");

const db = new DataLayer();

run();

async function run() {
  try {
    const result = await db.getAll();
    for (let employee of result) {
      console.log(
        employee.employeeId,
        employee.firstname,
        employee.lastname,
        employee.department
      );
    }

    // console.log(result); //RESULT of the db

    //@GET one employee from the db
    // const person = await db.get(2);
    // console.log(person);

    //@ALL values present in an entry
    // console.log(Object.values(person));

    //@TESTING out an empty entry - should get {} and an invalid entry
    // console.log(await db.get(4));
    // console.log(await db.get("x"));

    // @INSERT into table
    //NOTE - Line 36.. Get an ID first then proceed to insert
    // const person = await db.get(60);
    // person.employeeId = 60;
    // person.firstname = "Delete";
    // person.lastname = "Practice";
    // person.department = "perfection";
    // person.salary = 2000;
    // console.log(await db.insert(person));

    //@RETURN all values for each entry in an object format
    //Go from first... A.k.a from Employee Id downwards
    //Go from the last entry upwards
    // let [first, ...rest] = Object.values(person);
    // let params = [...rest, first];
    // console.log(params);

    //@UPDATE an entry/entries
    // person.salary = 1000;
    // person.firstname = "Mary";
    // console.log(await db.update(person));

    //@DELETE an entry
    console.log(await db.remove(60));

    // console.log(await db.getAll());
  } catch (err) {
    console.log(err.message);
  }
}
