"use strict";

const phoneRegister = require("./phones.json");

// const getTypes = (type) => {
//   for (let phoneType of phoneTypes) {
//     return phoneType;
//   }
// };

// console.log(getTypes());
//Solution one
exports.getTypes = () => {
  let types = [];
  for (let person of phoneRegister) {
    for (let phone of person.phones) {
      if (!types.includes(phone.type)) {
        types.push(phone.type);
      }
    }
  }
  return types;
};

//Solution 2 - Get numbers by type
exports.getNumbersByType = (firstname, lastname, type) => {
  if (firstname && lastname && type) {
    const numbers = [];
    for (let person of phoneRegister) {
      if (person.firstname === firstname && person.lastname === lastname) {
        for (let phone of person.phones) {
          if (phone.type === type) {
            numbers.push(phone.number);
          }
        }
      }
    }
    return numbers;
  } else {
    throw new Error("Missing Parameter");
  }
};
