"use strict";
const persons = require("./phones.json");

for (let person of persons) {
  console.log(`${person.firstname} ${person.lastname}`);

  for (let phone of person.phones) {
    console.log(`\t${phone.type} ${phone.number}`);
  }
}
