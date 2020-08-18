"use strict";

const phoneRegister = require("./phones.json");

// const getTypes = (type) => {
//   for (let phoneType of phoneTypes) {
//     return phoneType;
//   }
// };

// console.log(getTypes());

exports.getTypes = (type) => {
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
