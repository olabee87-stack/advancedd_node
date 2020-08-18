"use strict";

const phoneRegister = require("./phones.json");

//Solution one - Get types of numbers
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

//Solution 3
exports.getAllNumbersByType = (type) => {
  if (!type) throw new Error("Missing parameter");
  const numbersFound = [];
  for (let person of phoneRegister) {
    for (let phone of person.phones) {
      if (phone.type === type) {
        numbersFound.push({
          firstname: person.firstname,
          lastname: person.lastname,
          number: { type: phone.type, tel: phone.number },
        });
      }
    }
  }
  return numbersFound;
};
