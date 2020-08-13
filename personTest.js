"use strict";
const person = require("./person.json");
console.log(person.firstname);
console.log(person.phones);
for (let puh of person.phones) {
  console.log(puh);
}
console.log(`Hi ${person.firstname}. You are almost ${++person.age}`);
