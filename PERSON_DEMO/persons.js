"use strict";

const persons = require("./persons.json");

const get = (key, value) => {
  const found = [];
  if (key && value) {
    for (let person of persons) {
      if (person[key] === value) {
        found.push(person);
      }
    }
  }
  return found;
};

//Get all persons without param
const getAll = () => {
  return persons;
};

module.exports = {
  get,
  getAll,
};
