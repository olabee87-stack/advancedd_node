"use strict";
const persons = require("./phones.json");

//Print fname and last names of persons in the json file
for (let person of persons) {
  console.log(`${person.firstname} ${person.lastname}`);

  //Print phones of persons from the json file, phones
  for (let phone of person.phones) {
    console.log(`\t${phone.type} ${phone.number}`);
  }
}

for (let person of persons) {
  console.log(`${person.lastname}`);
  const types = [];
  for (let phone of person.phones) {
    if (!types.includes(phone.type)) {
      types.push(phone.type);
    }
  }
  console.log(`\t${types.join("\n\t")}`);
}
