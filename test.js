"use strict";

const person = require("./person.json");

console.log(person.lastname);
console.log(person.phones);
console.log(person.phones[0]);
console.log(person.phones[1]);

for (let phone of person.phones) {
  console.log(phone);
}

for (let i = 0; i < person.phones.length; i++) {
  console.log(i, ":", person.phones[i]);
}

console.log(`Hi youre almost${++person.age}`);
